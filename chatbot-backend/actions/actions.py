from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import EventType
from rasa_sdk.types import DomainDict
import requests
import json
from datetime import datetime, timedelta
from functools import cmp_to_key

city_codes = {'chandigarh': 114107, 'gangtok': 119221, 'goa': 119805, 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': 138673, 'udaipur': 140522, 'new delhi': 130443,'delhi': 130443, 'srinagar': 139456, 'mumbai': 144306, 'dubai': 115936, 'bali': 110670, 'singapore': 138703, 'thailand': 107167, 'tokyo': 148251, 'rio de janeiro': 134921, 'auckland': 109654, 'paris': 131408, 'melbourne': 127718, 'london': 126632, 'new york': 130452,'newyork': 130452, 'pondicherry': 150358, 'puri': 132593, 'port blair': 133556, 'daman': 116035, 'jaisalmer': 122326}

travel_type = {
    'cityscapes': ['chandigarh','udaipur','delhi','mumbai','jaisalmer'],
    'mountains': ['ladakh','manali','nainital','shimla','srinagar'],
    'beach': ['goa','pondicherry','port blair','puri','daman'],
    'foreign': ['dubai', 'bali', 'singapore', 'paris', 'london'],
}

hotel_budget_mapping = {
    'low': ['OneStar','TwoStar'],
    'low-mid': ['ThreeStar'],
    'mid': ['FourStar'],
    'high': ['FiveStar']
}

cities = ['chandigarh', 'gangtok', 'goa', 'kasauli', 'ladakh', 'manali', 'munnar', 'nainital', 'shimla', 'udaipur', 'new delhi','delhi', 'srinagar', 'mumbai', 'dubai', 'bali', 'singapore', 'thailand', 'tokyo', 'rio de janeiro', 'auckland', 'paris', 'melbourne', 'london', 'new york','newyork', 'pondicherry', 'puri','daman','port blair','jaisalmer']

months = ['january','february','march','april','may','june','july','august','september','october','november','december']

month_mapping = {
    'january':["01",31],
    'february':["02",29],
    'march':["03",31],
    'april':["04",30],
    'may':["05",31],
    'june':["06",30],
    'july':["07",31],
    'august':["08",31],
    'september':["09",30],
    'october':["10",31],
    'november':["11",30],
    'december':["12",31]
}

class ValidateTravelForm(FormValidationAction):
    def name(self) -> Text:
        # print("i'm here1")
        return "validate_travel_form"
    
    async def validate_place(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `place` value"""
        # print("i'm here2")
        if slot_value.lower() not in cities: 
            dispatcher.utter_message(text=f"Entered value is not accepted in our database yet")
            return {"place": None}
        else:
            return {"place": slot_value}
        
    async def validate_month(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `month` value"""
        # print("i'm here3")
        if slot_value.lower() not in months: 
            dispatcher.utter_message(text=f"Enter a valid month or please check spellings")
            return {"month": None}
        else: 
            return {"month": slot_value}
        
    async def validate_hotel_budget(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `hotel_budget` value"""
        # print("i'm here3")
        if slot_value.lower() not in ['low','low-mid','mid','high']:
            dispatcher.utter_message(text=f"Enter a valid budget, we only support 'low', 'low-mid', 'mid' and 'high'")
            return {"hotel_budget": None}
        else: 
            return {"hotel_budget": slot_value}
        
    async def validate_days(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `days` value"""
        # print("i'm here3")
        if slot_value.isnumeric():
            slot_value = int(slot_value)
            return {"days": slot_value}
        else: 
            dispatcher.utter_message(text=f"Enter valid number of days")
            return {"days": None}


class ActionFetchHotels(Action):
    def name(self) -> Text:
        # print("i'm here1")
        return "action_fetch_hotels"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        city = tracker.get_slot("place")
        month = tracker.get_slot("month")
        budget = tracker.get_slot("hotel_budget")
        days_of_travel = int(tracker.get_slot("days"))
        rating = hotel_budget_mapping[budget]
        code = city_codes[city]

        def compare_hotels(h1, h2):
            rating1 = h1.get("HotelInfo").get("TripAdvisorRating")
            rating2 = h2.get("HotelInfo").get("TripAdvisorRating")
            price1 =  float(h1.get("MinHotelPrice").get("TotalPrice"))
            price2 =  float(h2.get("MinHotelPrice").get("TotalPrice"))
            if rating1==None: 
                rating1=float(0)
            else:
                rating1 = float(h1.get("HotelInfo").get("TripAdvisorRating"))
            if rating2==None:
                rating2=float(0)
            else:
                rating2 = float(h2.get("HotelInfo").get("TripAdvisorRating"))

            if rating1 == rating2:
                if price1 < price2:
                    return -1
                else:
                    return 1
            else:
                if rating1 > rating2:
                    return -1
                else: 
                    return 1
                
        def compare_flight(f1, f2):
            price1 = float(f1.get("Fare").get("PublishedFare"))
            price2 = float(f2.get("Fare").get("PublishedFare"))
            if price1 < price2:
                return -1
            else:
                return 1

        total_price = 1000000
        hotel_details=[]
        arrival_flight_details={}
        depart_flight_details={}
        for date in [1,10,20]:
            curr_price=0
            if date + days_of_travel > month_mapping[month][1]:
                break
            first_day = ""
            if date < 10:
                first_day = "2024-" + month_mapping[month][0] + "-0" + str(date)
            else:
                first_day = "2024-" + month_mapping[month][0] + "-" + str(date)
            
            start_date_obj = datetime.strptime(first_day, '%Y-%m-%d')
            result_date_obj = start_date_obj + timedelta(days=days_of_travel)
            last_day= result_date_obj.strftime('%Y-%m-%d')
            # print(type(first_day))
            hotel_body = {
                "CheckIn": first_day,
                "CheckOut": last_day,
                "HotelCodes": "",
                "CityCode": str(code),
                "CityName": city.capitalize(),
                "CountryName": "India",
                "GuestNationality": "IN",
                "PreferredCurrencyCode": "INR",
                "PaxRooms": [
                    {
                        "Adults": 1,
                        "Children": 0
                    }
                ],
                "IsDetailResponse": True,
                "ResponseTime": 23,
                "Filters": {
                    "MealType": "All",
                    "Refundable": "all",
                    "NoOfRooms": 1,
                    "StarRating": "All"
                }
            }
            # print("rating: ", rating)
            # print("HOTEL BODY: ",hotel_body)
            hotel_response = requests.post("http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch",json=hotel_body,auth=("hackathontest","Hac@48298799")).json()
            # print(hotel_response)
            temp_hotel_details=[]
            if hotel_response.get("Status").get("Code")==200:
                print("here")
                if hotel_response.get("HotelSearchResults"):
                    temp = sorted(hotel_response.get("HotelSearchResults"),key=cmp_to_key(compare_hotels))
                    print("Hotel Data -> ",temp)
                    for hotel in temp:
                        if hotel.get("HotelInfo").get("Rating") in rating:
                            curr_price += hotel.get("MinHotelPrice").get("TotalPrice")
                            break
                    for hotel in temp:
                        if len(temp_hotel_details) == 5:
                            if hotel.get("HotelInfo").get("Rating") in rating:
                                temp_hotel_details.append(hotel)

            print("Hotel Price = ", curr_price)


            flight_body = {
                "EndUserIp": "192.168.10.10",
                "TokenId": "5542cebd-f6d5-4e94-a11d-eea3f0e18e37",
                "AdultCount": "1",
                "ChildCount": "0",
                "InfantCount": "0",
                "DirectFlight": "false",
                "OneStopFlight": "false",
                "JourneyType": "2",
                "PreferredAirlines": None,
                "Segments": [
                    {
                        "Origin": "DEL",
                        "Destination": "BOM",
                        "FlightCabinClass": "1",
                        "PreferredDepartureTime": first_day + "T00: 00: 00",
                        "PreferredArrivalTime": first_day + "T00: 00: 00"
                    },
                    {
                        "Origin": "BOM",
                        "Destination": "DEL",
                        "FlightCabinClass": "1",
                        "PreferredDepartureTime": last_day + "T00: 00: 00",
                        "PreferredArrivalTime": last_day + "T00: 00: 00"
                    },
                ],
                "Sources": None
            }
            # print("FLIGHT BODY: ",flight_body)
            flight_response = requests.post("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search",json=flight_body,auth=("Hackathon","Hackathon@1234")).json().get("Response")
            # print(flight_response)
            flight_cost = 0
            temp_depart={}
            temp_return={}
            if flight_response.get("ResponseStatus") == 1:
                if flight_response.get("Results"):
                    # print("here1")
                    depart_flight = flight_response.get("Results")[0]
                    return_flight = flight_response.get("Results")[1]
                    # print("here2")
                    temp_depart = sorted(depart_flight,key=cmp_to_key(compare_flight))[0]
                    temp_return = sorted(return_flight,key=cmp_to_key(compare_flight))[0]
                    # print("here3")
                    flight_cost = temp_depart.get("Fare").get("PublishedFare") + temp_return.get("Fare").get("PublishedFare")
                    print("here4")


            print("Flight Cost = ",flight_cost)

            curr_price += flight_cost

            if curr_price < total_price:
                total_price = curr_price
                depart_flight_details = temp_depart
                arrival_flight_details = temp_return
                hotel_details = temp_hotel_details
        
        result = {
            "DepartureFlightDetails": depart_flight_details,
            "HotelDetailsList": hotel_details,
            "ArrivalFlightDetails": arrival_flight_details
        }
        print(result)
        dispatcher.utter_message(json.dumps(result))
        return []


# city_codes = {'chandigarh': 114107, 'gangtok': 119221, 'goa': 119805, 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': 138673, 'udaipur': 140522, 'new delhi': 130443,'delhi': 130443, 'srinagar': 139456, 'mumbai': 144306, 'dubai': 115936, 'bali': 110670, 'singapore': 138703, 'thailand': 107167, 'tokyo': 148251, 'rio de janeiro': 134921, 'auckland': 109654, 'paris': 131408, 'melbourne': 127718, 'london': 126632, 'new york': 130452,'newyork': 130452}

# [{'Code': '114107', 'Name': 'Chandigarh,   Chandigarh'}, {'Code': '119221', 'Name': 'Gangtok,   Sikkim'}, {'Code': '119805', 'Name': 'Goa,   GOA'}, {'Code': '122950', 'Name': 'Kasauli,   Himachal Pradesh'}, {'Code': '150363', 'Name': 'Ladakh,   Jammu and Kashmir'}, {'Code': '126388', 'Name': 'Manali,   Himachal pradesh'}, {'Code': '128573', 'Name': 'Munnar,   Kerala'}, {'Code': '129726', 'Name': 'Nainital,   Uttarakhand'}, {'Code': '138673', 'Name': 'Shimla,   Himachal Pradesh'}, {'Code': '140522', 'Name': 'Udaipur,   Rajasthan'},{"Code": "130443","Name": "New Delhi,   DELHI"}, {"Code": "139456","Name": "Srinagar,   Jammu and Kashmir"},{"Code": "144306","Name": "Mumbai,   Maharashtra"}, {"Code": "115936","Name": "Dubai"}, {"Code": "110670","Name": "Bali"}, {"Code": "138703","Name": "Singapore"}, {"Code": "107167","Name": "Thailand"}, {"Code": "148251","Name": "Tokyo"}, {"Code": "134921","Name": "Rio de Janeiro"}, {"Code": "109654","Name": "Auckland"}, {"Code": "131408","Name": "Paris"}, {"Code": "127718","Name": "Melbourne,   Victoria"}, {"Code": "126632","Name": "London"}, {"Code": "130452","Name": "New York,   New York"}]

# list of states = ['kerala', 'andaman & nicobar', 'gujarat', 'daman and diu', 'west bengal', 'west bengal', 'uttar pradesh', 'meghalaya', 'odisha', 'andra pradesh', 'tripura', 'madhya pradesh', 'uttarakhand', 'delhi national territory', 'himachal pradesh', 'bihar', 'himachal pradesh', 'goa', 'tamil nadu', 'karnataka', 'tamil nadu', 'telangana', 'jammu and kashmir', 'maharashtra', 'dadra and nagar have', 'uttarakhand', 'orissa', 'gujrat', 'kerala', 'andhra pradesh', 'delhi', 'haryana', 'mizoram', 'chhattisgarh', 'uttar pradesh', 'karnataka', 'chandigarh', 'goa', 'punjab', 'himachal pradesh', 'rajasthan', 'jharkhand', 'rajasthan', 'assam', 'sikkim']

# list of cities = ['rohet', 'giridih', 'shamirpet', 'north paravur', 'muzaffarnagar', 'vadodara', 'cherai beach', 'zirakpur', 'munsiyari', 'malappuram', 'vizhinjam', 'gwalior', 'raipur', 'darjeeling', 'kurnool', 'nalkeri', 'krishnagiri', 'vishakapatnam', 'arambol', 'pandikkad', 'sangli', 'asansol', 'nashik', 'bhandardara', 'mathura', 'latur', 'raigad', 'choglamsar', 'hebbal', 'guirim', 'umaria', 'solapur', 'kuchaman', 'velangani', 'mandrem', 'sambalpur', 'chundale', 'kothamangalam', 'shahpur', 'greater noida', 'cavelossim', 'canacona', 'mandarmoni', 'murud', 'benaulim', 'covelong', 'bharuch', 'agartala', 'aizawl', 'moradabad', 'veraval', 'sirkazhi', 'sasan gir', 'balangir', 'coochbehar', 'vrindavan', 'calcutta', 'matheran', 'tarangambadi', 'hampi', 'chidambaram', 'chittaurgarh', 'purakkad', 'karimnagar', 'ludhiana', 'chakan', 'kamalpur', 'chhota udaipur', 'surat', 'mettupalayam', 'kalpetta', 'varca beach', 'candolim beach', 'malpura', 'aurangabad', 'nyerak', 'nanded', 'bangaram island', 'dimapur', 'rajkot', 'glenburn', 'nadiad', 'ranakpur', 'kanpur', 'bakkhali', 'salem', 'dankuni', 'satpura', 'calicut', 'balaghat', 'jhansi', 'devikulam', 'kanyakumari', 'pollachi', 'shahpura', 'ajabgarh', 'mukteshwar', 'kota', 'tiruppur', 'kamba', 'thanneermukkom', 'dharampur', 'shivpuri', 'lataguri', 'kasauli', 'guruvayur', 'bhatinda', 'guntur', 'tirupati', 'fatehgarh', 'ratlam', 'pakhal', 'chikmagalur', 'sravasti', 'abu road', 'candolim', 'hisar', 'saharanpur', 'tib bago', 'rajgir', 'jispa', 'govardhan', 'kappad', 'shirdi', 'thiruvananthapuram', 'arcot', 'sonamarg', 'skara', 'sitlakhet', 'jwalamukhi', 'b. r. hills', 'muradabad', 'bhat', 'hyderabad', 'shamshabad', 'sikar', 'jeypore', 'shimoga', 'badami', 'car nicobar', 'lachung', 'bangalore', 'dharamsala', 'panipat', 'pantnagar', 'vandanmedu', 'fatehabad', 'jhunjhunu', 'bagdogra', 'bhubaneswar', 'dausa', 'solan', 'karwar', 'nattika', 'rupsi', 'porbandar', 'utorda beach', 'kudal', 'pulamanthole', 'arpora', 'kutch', 'yuksom', 'sanand', 'pokhran', 'ajmer', 'kanha', 'ahmednagar', 'ravangla', 'majorda beach', 'warangal', 'coorg', 'turia', 'igatpuri', 'nagarhole national park', 'sindhudi', 'digha', 'kumarakom', 'ramagundam', 'jodhpur', 'jaipur', 'mcleod ganj', 'chhindwara', 'cuddapah', 'haridwar', 'kashid', 'nagoa', 'sultan bathery', 'yavatmal', 'badrinath', 'vasco da gama', 'hosur', 'shingrak', 'deogarh', 'gosaba', 'uchiyarda', 'roorkee', 'colva', 'bhowali', 'indore', 'ranchi', 'vagamon', 'daman', 'itanagar', 'mount abu', 'dhikuli', 'sinquerim beach', 'mumbai', 'namchi', 'phalodi', 'dhanaulti', 'somnath', 'chalakudy', 'hansi', 'malayattoor', 'nilgiri', 'secunderabad', 'burhanpur', 'yamunotri', 'dhanbad', 'auli', 'nakinda', 'jalore', 'mandawa', 'tawang', 'ratnagiri', 'palani', 'tirunelveli', 'gurgaon', 'havelock island', 'mangalore', 'kushinagar', 'pench', 'panjim', 'ramathra fort', 'baga', 'tarapith', 'sunderban', 'karur', 'amer', 'kaziranga', 'navi mumbai', 'ramgarh', 'dwarka', 'rewa', 'kedarnath', 'beawar', 'mohali', 'bundi', 'lakkidi', 'murinjapuzha', 'sanchi', 'ponmudi', 'cansaulim beach', 'tala', 'bilaspur', 'kollam', 'devprayag', 'alwar', 'neil island', 'katihar', 'sahibzada ajit singh nagar', 'gokarna', 'kodaikanal', 'thekkady', 'barbil', 'tezpur', 'tiruchirappalli', 'kasarde', 'alto porvorim', 'bhiwadi', 'gorakhpur', 'rameshwaram', 'balurghat', 'bijaipur', 'durgapur', 'kushalnagar', 'dhanachuli', 'periyar', 'whitefield', 'chamba', 'kumbhalgarh', 'agra', 'bijainagar', 'kathgodam', 'mahabaleshwar', 'sholayur', 'khajjiar', 'pahalgam', 'pathankot', 'koti', 'puttaparthi', 'silchar', 'guwahati', 'kovalam', 'dharmapuri', 'kihim', 'keshod', 'midnapur', 'fort tiracol', 'phaltan', 'zaribago', 'jalgaon', 'cochin', 'chandigarh', 'nawalgarh', 'aligarh', 'hubli', 'jalandhar', 'jammu', 'kashipur', 'madurai', 'guna', 'vellore', 'kalady', 'thalassery', 'bhagalpur', 'charholi budruk', 'pernem', 'wankaner', 'madikeri', 'pachmarhi', 'pangong tso lake', 'bekal', 'kotputli', 'tinsukia', 'sriperumbudur', 'jagdalpur', 'thane', 'anand', 'meerut', 'gaya', 'neyveli', 'rajahmundry', 'alleppey', 'murbad', 'dirang', 'bijapur', 'kalpatta', 'fatehpur sikri', 'faridabad', 'seoni', 'mashobra', 'tura', 'vapi', 'visakhapatnam', 'bandipur', 'mahabalipuram', 'varanasi', 'kottayam', 'mandi', 'bharatpur', 'padappai', 'angul', 'khandela', 'palanpur', 'darbhanga', 'maheshwar', 'hospet', 'dungarpur', 'margao', 'north lakhimpur', 'vizianagaram', 'muzaffarpur', 'nainital', 'bhimtal', 'karnal', 'balrampur', 'junagadh', 'nimaj', 'gandhinagar', 'bellary', 'rajapalayam', 'baindur', 'rourkela', 'jamnagar', 'dhela', 'khandwa', 'chittorgarh', 'theni', 'karad', 'sawai madhopur', 'adoor', 'edava', 'wandoor', 'paragpur', 'patna', 'shekhawati', 'lava', 'dundlod', 'siliguri', 'along', 'allahabad', 'bhilai', 'titwala', 'hoshiarpur', 'hanumangarh', 'kanadukathan', 'una', 'kasargod', 'marari beach', 'shimla', 'rohtak', 'kullu', 'siana', 'morbi', 'bandhavgarh-nationalpark', 'shantiniketan', 'palolem beach', 'cuttack', 'bhuj', 'alibag', 'bhopal', 'vythiri', 'pench nationalpark', 'unchagaon', 'kumbalgarh', 'hooghly', 'bhavnagar', 'kudasan', 'malda', 'narkanda', 'sariska national park', 'uruli kanchan', 'behror', 'mussoorie', 'pimpri-chinchwad', 'bodhgaya', 'amravati', 'anjuna', 'thanjavur', 'ayodhya', 'auroville', 'coimbatore', 'ramakkalmedu', 'srikakulam', 'arrosim beach', 'dadahu', 'jambulne', 'mysore', 'thrissur', 'paravur', 'manipal', 'ichalkaranji', 'dahej', 'poovar', 'rinchenpong', 'vayalar', 'champakulam', 'nagpur', 'mamallapuram', 'thiksey', 'kotagiri', 'mapusa', 'bhiwandi', 'rohetgarh', 'jalpaiguri', 'varkala', 'orchha', 'satna', 'bogmallo', 'yelagiri', 'hudikeri', 'kerala', 'betul', 'pelling', 'haldwani', 'samayapuram', 'satara', 'tiruttani', 'athirapilly', 'nagapattinam', 'velsao beach', 'bharmour', 'bhilwara', 'durg', 'trimbak', 'kasol', 'khilchipur', 'khajuraho', 'ooty', 'kalyan', 'morjim', 'wayanad', 'ganpatipule', 'kishangarh', 'ankleshwar', 'betalbatim beach', 'dandeli', 'majorda', 'vazhoor', 'corbett-nationalpark', 'mayiladuthurai', 'chennai', 'jorhat', 'pushkar', 'panchkula', 'chorao island', 'bikaner', 'kolhapur', 'nalagarh', 'dehradun', 'neeleshwar', 'dhule', 'katra', 'konark', 'kochi', 'nellore', 'binsar', 'pune', 'gangotri', 'howrah', 'stok', 'chaukori', 'kalimpong', 'tiruvannamalai', 'perinthalmanna', 'ramnagar', 'patnitop', 'diu', 'brahmapur', 'renigunta', 'thakurdwara', 'palampur', 'ghaziabad', 'luni', 'rewari', 'goa velha', 'ahmedabad', 'junagarh', 'rudrapur', 'basara', 'narlai', 'naggar', 'kottivakkam', 'athirapally', 'mahansar', 'jabalpur', 'benaulim beach', 'gangtok', 'chail', 'cherai', 'thumkunta', 'sirsa', 'bokkapuram', 'kandla', 'bheeramballi', 'kuruppanthara', 'perambalur', 'kanchipuram', 'chintpuri', 'bardez', 'yercaud', 'srinagar', 'salasar', 'bokaro', 'kannur', 'chandipur', 'kandaghat', 'kondotty', 'kaliel', 'baddi', 'kanniyakumari', 'panna', 'calangute', 'bishangarh', 'gudalur', 'patiala', 'meppadi', 'aronda', 'gorai beach', 'trivandrum', 'bhayandar', 'ujjain', 'deepyokma', 'manali', 'gangavathi', 'deoghar', 'rajgarh', 'ranikhet', 'rudraprayag', 'pathanamthitta', 'panchgani', 'bhuntar', 'nahar magra', 'imphal', 'dapoli', 'cauvery', 'lucknow', 'uttarkashi', 'vasai', 'thodupuzha', 'lahaul and spiti', 'ambala', 'neemrana', 'daund', 'udaipur', 'changanassery', 'barauni', 'chikmaglur', 'bhogapuram', 'mirik', 'tuticorin', 'pali', 'verem', 'caranzalem', 'lingshed', 'kargil', 'almora', 'dabolim', 'mandu', 'akola', 'puducherry', 'palakkad', 'changodar', 'saligao', 'chandrapur', 'balasinore', 'mukundgarh', 'ranthambore nationalpark', 'mahad', 'barmer', 'manmad', 'nedumbassery', 'orissa', 'vajrahalli', 'kausani', 'sri ganganagar', 'kumbakonam', 'rajakkad', 'goa', 'bomdila', 'vagator', 'port blair', 'silvassa', 'dindigul', 'jalna', 'churu', 'jhadol', 'hassan', 'bareilly', 'karaikudi', 'maradu', 'mararikulam', 'chinakakani', 'rishikesh', 'adyar', 'khimsar', 'kakinada', 'mohania', 'amritsar', 'pinjore', 'hinjawadi', 'gulmarg', 'sungal', 'pateri', 'kundapur', 'munnar', 'shillong', 'wakad', 'siolim', 'mukkam', 'lonavala', 'baramati', 'chowara', 'kumily', 'puri', 'parra', 'khandala', 'khas nagrota', 'leh', 'singrauli', 'vaikom', 'malvan', 'agatti', 'new delhi', 'jamshedpur', 'vallikunnam', 'namakkal', 'mollem', 'alipurduar', 'dibrugarh', 'dholpur', 'phagwara', 'parwanoo', 'anandpur', 'samode', 'ladakh', 'dalhousie', 'gandhidham', 'lansdowne', 'udupi', 'nerul', 'sitalakhet', 'hubli-dharwad', 'karauli', 'belgaum', 'ahmedpur mandvi', 'vijayawada', 'gopalpur on sea', 'chitrakoot', 'hemis skupachan', 'baratang island', 'kangra valley', 'kadmat island', 'kailashahar', 'mohan', 'dooars', 'vainguinim beach', 'pondicherry', 'noida', 'belur & halebid', 'wüste thar', 'pudukkotai', 'coonoor', 'suratgarh', 'nadukani', 'omkareshwar', 'chamoli', 'sardargarh', 'chinnakanal', 'chiplun', 'panvel', 'chilling', 'mobor beach', 'jaisalmer', 'ernakulam', 'mullor']
