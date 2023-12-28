from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import EventType
from rasa_sdk.types import DomainDict
import requests
import json

city_codes = {'chandigarh': 114107, 'gangtok': 119221, 'goa': 119805, 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': 138673, 'udaipur': 140522, 'new delhi': 130443,'delhi': 130443, 'srinagar': 139456, 'mumbai': 144306, 'dubai': 115936, 'bali': 110670, 'singapore': 138703, 'thailand': 107167, 'tokyo': 148251, 'rio de janeiro': 134921, 'auckland': 109654, 'paris': 131408, 'melbourne': 127718, 'london': 126632, 'new york': 130452,'newyork': 130452}
budget_mapping = {
    'low': ['TwoStar'],
    'mid': ['ThreeStar'],
    'high': ['FourStar','FiveStar']
}
cities = ['chandigarh', 'gangtok', 'goa', 'kasauli', 'ladakh', 'manali', 'munnar', 'nainital', 'shimla', 'udaipur', 'new delhi','delhi', 'srinagar', 'mumbai', 'dubai', 'bali', 'singapore', 'thailand', 'tokyo', 'rio de janeiro', 'auckland', 'paris', 'melbourne', 'london', 'new york','newyork']
months = ['january','february','march','april','may','june','july','august','september','october','november','december']

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
        
    async def validate_budget(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `budget` value"""
        # print("i'm here3")
        if slot_value.lower() not in ['low','mid','high']: 
            dispatcher.utter_message(text=f"Enter a valid budget, we only support 'low', 'mid' and 'high'")
            return {"budget": None}
        else: 
            return {"budget": slot_value}


class ActionFetchHotels(Action):
    def name(self) -> Text:
        # print("i'm here1")
        return "action_fetch_hotels"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        city = tracker.get_slot("place")
        budget = tracker.get_slot("budget")
        rating = budget_mapping[budget]
        code = city_codes[city]
        # print("rating: ", rating)
        response = requests.post("http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList",data={"CityCode":code},auth=("hackathontest","Hac@48298799")).json()
        result=[]
        if response:
            hotel_list = response.get("Hotels")
            for hotel in hotel_list:
                if len(result)==3: break
                # print(hotel.get("HotelRating"))
                if (hotel.get("HotelRating")) in rating:
                    result.append(hotel)
                # else:
                #     dispatcher.utter_message("Please mention a valid budget.")
        else:
            dispatcher.utter_message(text="There is an internal server error, please try again after some time.")
        dispatcher.utter_message(json.dumps(result))
        return []


# city_codes = {'chandigarh': 114107, 'gangtok': 119221, 'goa': 119805, 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': 138673, 'udaipur': 140522, 'new delhi': 130443,'delhi': 130443, 'srinagar': 139456, 'mumbai': 144306, 'dubai': 115936, 'bali': 110670, 'singapore': 138703, 'thailand': 107167, 'tokyo': 148251, 'rio de janeiro': 134921, 'auckland': 109654, 'paris': 131408, 'melbourne': 127718, 'london': 126632, 'new york': 130452,'newyork': 130452}

# [{'Code': '114107', 'Name': 'Chandigarh,   Chandigarh'}, {'Code': '119221', 'Name': 'Gangtok,   Sikkim'}, {'Code': '119805', 'Name': 'Goa,   GOA'}, {'Code': '122950', 'Name': 'Kasauli,   Himachal Pradesh'}, {'Code': '150363', 'Name': 'Ladakh,   Jammu and Kashmir'}, {'Code': '126388', 'Name': 'Manali,   Himachal pradesh'}, {'Code': '128573', 'Name': 'Munnar,   Kerala'}, {'Code': '129726', 'Name': 'Nainital,   Uttarakhand'}, {'Code': '138673', 'Name': 'Shimla,   Himachal Pradesh'}, {'Code': '140522', 'Name': 'Udaipur,   Rajasthan'},{"Code": "130443","Name": "New Delhi,   DELHI"}, {"Code": "139456","Name": "Srinagar,   Jammu and Kashmir"},{"Code": "144306","Name": "Mumbai,   Maharashtra"}, {"Code": "115936","Name": "Dubai"}, {"Code": "110670","Name": "Bali"}, {"Code": "138703","Name": "Singapore"}, {"Code": "107167","Name": "Thailand"}, {"Code": "148251","Name": "Tokyo"}, {"Code": "134921","Name": "Rio de Janeiro"}, {"Code": "109654","Name": "Auckland"}, {"Code": "131408","Name": "Paris"}, {"Code": "127718","Name": "Melbourne,   Victoria"}, {"Code": "126632","Name": "London"}, {"Code": "130452","Name": "New York,   New York"}]

# list of states = ['kerala', 'andaman & nicobar', 'gujarat', 'daman and diu', 'west bengal', 'west bengal', 'uttar pradesh', 'meghalaya', 'odisha', 'andra pradesh', 'tripura', 'madhya pradesh', 'uttarakhand', 'delhi national territory', 'himachal pradesh', 'bihar', 'himachal pradesh', 'goa', 'tamil nadu', 'karnataka', 'tamil nadu', 'telangana', 'jammu and kashmir', 'maharashtra', 'dadra and nagar have', 'uttarakhand', 'orissa', 'gujrat', 'kerala', 'andhra pradesh', 'delhi', 'haryana', 'mizoram', 'chhattisgarh', 'uttar pradesh', 'karnataka', 'chandigarh', 'goa', 'punjab', 'himachal pradesh', 'rajasthan', 'jharkhand', 'rajasthan', 'assam', 'sikkim']

# list of cities = ['rohet', 'giridih', 'shamirpet', 'north paravur', 'muzaffarnagar', 'vadodara', 'cherai beach', 'zirakpur', 'munsiyari', 'malappuram', 'vizhinjam', 'gwalior', 'raipur', 'darjeeling', 'kurnool', 'nalkeri', 'krishnagiri', 'vishakapatnam', 'arambol', 'pandikkad', 'sangli', 'asansol', 'nashik', 'bhandardara', 'mathura', 'latur', 'raigad', 'choglamsar', 'hebbal', 'guirim', 'umaria', 'solapur', 'kuchaman', 'velangani', 'mandrem', 'sambalpur', 'chundale', 'kothamangalam', 'shahpur', 'greater noida', 'cavelossim', 'canacona', 'mandarmoni', 'murud', 'benaulim', 'covelong', 'bharuch', 'agartala', 'aizawl', 'moradabad', 'veraval', 'sirkazhi', 'sasan gir', 'balangir', 'coochbehar', 'vrindavan', 'calcutta', 'matheran', 'tarangambadi', 'hampi', 'chidambaram', 'chittaurgarh', 'purakkad', 'karimnagar', 'ludhiana', 'chakan', 'kamalpur', 'chhota udaipur', 'surat', 'mettupalayam', 'kalpetta', 'varca beach', 'candolim beach', 'malpura', 'aurangabad', 'nyerak', 'nanded', 'bangaram island', 'dimapur', 'rajkot', 'glenburn', 'nadiad', 'ranakpur', 'kanpur', 'bakkhali', 'salem', 'dankuni', 'satpura', 'calicut', 'balaghat', 'jhansi', 'devikulam', 'kanyakumari', 'pollachi', 'shahpura', 'ajabgarh', 'mukteshwar', 'kota', 'tiruppur', 'kamba', 'thanneermukkom', 'dharampur', 'shivpuri', 'lataguri', 'kasauli', 'guruvayur', 'bhatinda', 'guntur', 'tirupati', 'fatehgarh', 'ratlam', 'pakhal', 'chikmagalur', 'sravasti', 'abu road', 'candolim', 'hisar', 'saharanpur', 'tib bago', 'rajgir', 'jispa', 'govardhan', 'kappad', 'shirdi', 'thiruvananthapuram', 'arcot', 'sonamarg', 'skara', 'sitlakhet', 'jwalamukhi', 'b. r. hills', 'muradabad', 'bhat', 'hyderabad', 'shamshabad', 'sikar', 'jeypore', 'shimoga', 'badami', 'car nicobar', 'lachung', 'bangalore', 'dharamsala', 'panipat', 'pantnagar', 'vandanmedu', 'fatehabad', 'jhunjhunu', 'bagdogra', 'bhubaneswar', 'dausa', 'solan', 'karwar', 'nattika', 'rupsi', 'porbandar', 'utorda beach', 'kudal', 'pulamanthole', 'arpora', 'kutch', 'yuksom', 'sanand', 'pokhran', 'ajmer', 'kanha', 'ahmednagar', 'ravangla', 'majorda beach', 'warangal', 'coorg', 'turia', 'igatpuri', 'nagarhole national park', 'sindhudi', 'digha', 'kumarakom', 'ramagundam', 'jodhpur', 'jaipur', 'mcleod ganj', 'chhindwara', 'cuddapah', 'haridwar', 'kashid', 'nagoa', 'sultan bathery', 'yavatmal', 'badrinath', 'vasco da gama', 'hosur', 'shingrak', 'deogarh', 'gosaba', 'uchiyarda', 'roorkee', 'colva', 'bhowali', 'indore', 'ranchi', 'vagamon', 'daman', 'itanagar', 'mount abu', 'dhikuli', 'sinquerim beach', 'mumbai', 'namchi', 'phalodi', 'dhanaulti', 'somnath', 'chalakudy', 'hansi', 'malayattoor', 'nilgiri', 'secunderabad', 'burhanpur', 'yamunotri', 'dhanbad', 'auli', 'nakinda', 'jalore', 'mandawa', 'tawang', 'ratnagiri', 'palani', 'tirunelveli', 'gurgaon', 'havelock island', 'mangalore', 'kushinagar', 'pench', 'panjim', 'ramathra fort', 'baga', 'tarapith', 'sunderban', 'karur', 'amer', 'kaziranga', 'navi mumbai', 'ramgarh', 'dwarka', 'rewa', 'kedarnath', 'beawar', 'mohali', 'bundi', 'lakkidi', 'murinjapuzha', 'sanchi', 'ponmudi', 'cansaulim beach', 'tala', 'bilaspur', 'kollam', 'devprayag', 'alwar', 'neil island', 'katihar', 'sahibzada ajit singh nagar', 'gokarna', 'kodaikanal', 'thekkady', 'barbil', 'tezpur', 'tiruchirappalli', 'kasarde', 'alto porvorim', 'bhiwadi', 'gorakhpur', 'rameshwaram', 'balurghat', 'bijaipur', 'durgapur', 'kushalnagar', 'dhanachuli', 'periyar', 'whitefield', 'chamba', 'kumbhalgarh', 'agra', 'bijainagar', 'kathgodam', 'mahabaleshwar', 'sholayur', 'khajjiar', 'pahalgam', 'pathankot', 'koti', 'puttaparthi', 'silchar', 'guwahati', 'kovalam', 'dharmapuri', 'kihim', 'keshod', 'midnapur', 'fort tiracol', 'phaltan', 'zaribago', 'jalgaon', 'cochin', 'chandigarh', 'nawalgarh', 'aligarh', 'hubli', 'jalandhar', 'jammu', 'kashipur', 'madurai', 'guna', 'vellore', 'kalady', 'thalassery', 'bhagalpur', 'charholi budruk', 'pernem', 'wankaner', 'madikeri', 'pachmarhi', 'pangong tso lake', 'bekal', 'kotputli', 'tinsukia', 'sriperumbudur', 'jagdalpur', 'thane', 'anand', 'meerut', 'gaya', 'neyveli', 'rajahmundry', 'alleppey', 'murbad', 'dirang', 'bijapur', 'kalpatta', 'fatehpur sikri', 'faridabad', 'seoni', 'mashobra', 'tura', 'vapi', 'visakhapatnam', 'bandipur', 'mahabalipuram', 'varanasi', 'kottayam', 'mandi', 'bharatpur', 'padappai', 'angul', 'khandela', 'palanpur', 'darbhanga', 'maheshwar', 'hospet', 'dungarpur', 'margao', 'north lakhimpur', 'vizianagaram', 'muzaffarpur', 'nainital', 'bhimtal', 'karnal', 'balrampur', 'junagadh', 'nimaj', 'gandhinagar', 'bellary', 'rajapalayam', 'baindur', 'rourkela', 'jamnagar', 'dhela', 'khandwa', 'chittorgarh', 'theni', 'karad', 'sawai madhopur', 'adoor', 'edava', 'wandoor', 'paragpur', 'patna', 'shekhawati', 'lava', 'dundlod', 'siliguri', 'along', 'allahabad', 'bhilai', 'titwala', 'hoshiarpur', 'hanumangarh', 'kanadukathan', 'una', 'kasargod', 'marari beach', 'shimla', 'rohtak', 'kullu', 'siana', 'morbi', 'bandhavgarh-nationalpark', 'shantiniketan', 'palolem beach', 'cuttack', 'bhuj', 'alibag', 'bhopal', 'vythiri', 'pench nationalpark', 'unchagaon', 'kumbalgarh', 'hooghly', 'bhavnagar', 'kudasan', 'malda', 'narkanda', 'sariska national park', 'uruli kanchan', 'behror', 'mussoorie', 'pimpri-chinchwad', 'bodhgaya', 'amravati', 'anjuna', 'thanjavur', 'ayodhya', 'auroville', 'coimbatore', 'ramakkalmedu', 'srikakulam', 'arrosim beach', 'dadahu', 'jambulne', 'mysore', 'thrissur', 'paravur', 'manipal', 'ichalkaranji', 'dahej', 'poovar', 'rinchenpong', 'vayalar', 'champakulam', 'nagpur', 'mamallapuram', 'thiksey', 'kotagiri', 'mapusa', 'bhiwandi', 'rohetgarh', 'jalpaiguri', 'varkala', 'orchha', 'satna', 'bogmallo', 'yelagiri', 'hudikeri', 'kerala', 'betul', 'pelling', 'haldwani', 'samayapuram', 'satara', 'tiruttani', 'athirapilly', 'nagapattinam', 'velsao beach', 'bharmour', 'bhilwara', 'durg', 'trimbak', 'kasol', 'khilchipur', 'khajuraho', 'ooty', 'kalyan', 'morjim', 'wayanad', 'ganpatipule', 'kishangarh', 'ankleshwar', 'betalbatim beach', 'dandeli', 'majorda', 'vazhoor', 'corbett-nationalpark', 'mayiladuthurai', 'chennai', 'jorhat', 'pushkar', 'panchkula', 'chorao island', 'bikaner', 'kolhapur', 'nalagarh', 'dehradun', 'neeleshwar', 'dhule', 'katra', 'konark', 'kochi', 'nellore', 'binsar', 'pune', 'gangotri', 'howrah', 'stok', 'chaukori', 'kalimpong', 'tiruvannamalai', 'perinthalmanna', 'ramnagar', 'patnitop', 'diu', 'brahmapur', 'renigunta', 'thakurdwara', 'palampur', 'ghaziabad', 'luni', 'rewari', 'goa velha', 'ahmedabad', 'junagarh', 'rudrapur', 'basara', 'narlai', 'naggar', 'kottivakkam', 'athirapally', 'mahansar', 'jabalpur', 'benaulim beach', 'gangtok', 'chail', 'cherai', 'thumkunta', 'sirsa', 'bokkapuram', 'kandla', 'bheeramballi', 'kuruppanthara', 'perambalur', 'kanchipuram', 'chintpuri', 'bardez', 'yercaud', 'srinagar', 'salasar', 'bokaro', 'kannur', 'chandipur', 'kandaghat', 'kondotty', 'kaliel', 'baddi', 'kanniyakumari', 'panna', 'calangute', 'bishangarh', 'gudalur', 'patiala', 'meppadi', 'aronda', 'gorai beach', 'trivandrum', 'bhayandar', 'ujjain', 'deepyokma', 'manali', 'gangavathi', 'deoghar', 'rajgarh', 'ranikhet', 'rudraprayag', 'pathanamthitta', 'panchgani', 'bhuntar', 'nahar magra', 'imphal', 'dapoli', 'cauvery', 'lucknow', 'uttarkashi', 'vasai', 'thodupuzha', 'lahaul and spiti', 'ambala', 'neemrana', 'daund', 'udaipur', 'changanassery', 'barauni', 'chikmaglur', 'bhogapuram', 'mirik', 'tuticorin', 'pali', 'verem', 'caranzalem', 'lingshed', 'kargil', 'almora', 'dabolim', 'mandu', 'akola', 'puducherry', 'palakkad', 'changodar', 'saligao', 'chandrapur', 'balasinore', 'mukundgarh', 'ranthambore nationalpark', 'mahad', 'barmer', 'manmad', 'nedumbassery', 'orissa', 'vajrahalli', 'kausani', 'sri ganganagar', 'kumbakonam', 'rajakkad', 'goa', 'bomdila', 'vagator', 'port blair', 'silvassa', 'dindigul', 'jalna', 'churu', 'jhadol', 'hassan', 'bareilly', 'karaikudi', 'maradu', 'mararikulam', 'chinakakani', 'rishikesh', 'adyar', 'khimsar', 'kakinada', 'mohania', 'amritsar', 'pinjore', 'hinjawadi', 'gulmarg', 'sungal', 'pateri', 'kundapur', 'munnar', 'shillong', 'wakad', 'siolim', 'mukkam', 'lonavala', 'baramati', 'chowara', 'kumily', 'puri', 'parra', 'khandala', 'khas nagrota', 'leh', 'singrauli', 'vaikom', 'malvan', 'agatti', 'new delhi', 'jamshedpur', 'vallikunnam', 'namakkal', 'mollem', 'alipurduar', 'dibrugarh', 'dholpur', 'phagwara', 'parwanoo', 'anandpur', 'samode', 'ladakh', 'dalhousie', 'gandhidham', 'lansdowne', 'udupi', 'nerul', 'sitalakhet', 'hubli-dharwad', 'karauli', 'belgaum', 'ahmedpur mandvi', 'vijayawada', 'gopalpur on sea', 'chitrakoot', 'hemis skupachan', 'baratang island', 'kangra valley', 'kadmat island', 'kailashahar', 'mohan', 'dooars', 'vainguinim beach', 'pondicherry', 'noida', 'belur & halebid', 'wüste thar', 'pudukkotai', 'coonoor', 'suratgarh', 'nadukani', 'omkareshwar', 'chamoli', 'sardargarh', 'chinnakanal', 'chiplun', 'panvel', 'chilling', 'mobor beach', 'jaisalmer', 'ernakulam', 'mullor']
