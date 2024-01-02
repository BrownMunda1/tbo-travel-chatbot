from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import EventType, SlotSet
from rasa_sdk.types import DomainDict
import requests
import json
from datetime import datetime, timedelta
from functools import cmp_to_key
import datetime as dt

city_codes = {'chandigarh': 114107, 'gangtok': 119221, 'goa': 119805, 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': 138673, 'udaipur': 140522, 'new delhi': 130443,'delhi': 130443, 'srinagar': 139456, 'mumbai': 144306, 'dubai': 115936, 'bali': 110670, 'singapore': 138703, 'thailand': 107167, 'tokyo': 148251, 'rio de janeiro': 134921, 'auckland': 109654, 'paris': 131408, 'melbourne': 127718, 'london': 126632, 'new york': 130452,'newyork': 130452, 'pondicherry': 150358, 'puri': 132593, 'port blair': 133556, 'daman': 116035, 'jaisalmer': 122326, 'leh': 125144, 'varanasi': 141618, 'banaras': 141618, 'dharamshala': 115880, 'meghalaya': 138670, 'shillong': 138670, 'kochi':101204, 'shirdi':137316, 'kolkata':113128, 'tirupati': 140311, 'amritsar': 101129, 'gaya':119358}

travel_type = {
    'cityscapes': ['chandigarh','udaipur','delhi','mumbai', 'kolkata'],
    'mountains': ['shimla','srinagar', 'leh', 'dharamshala','meghalaya'],
    'beach': ['goa','pondicherry','port blair','daman','kochi'],
    'foreign': ['dubai', 'bali', 'singapore', 'paris', 'london'],
    'pilgrimage':['shirdi','varanasi','tirupati','amritsar','gaya']
}

budget_mapping = {
    'low': ['OneStar','TwoStar'],
    'low-mid': ['ThreeStar'],
    'mid': ['FourStar'],
    'high': ['FiveStar']
}

airport_codes = {
    'chandigarh': "IXC", 'gangtok': 119221, 'goa': "GOX", 'kasauli': 122950, 'ladakh': 150363, 'manali': 126388, 'munnar': 128573, 'nainital': 129726, 'shimla': "SLV", 'udaipur': "UDR", 'new delhi': "DEL",'delhi': "DEL", 'srinagar': "SXR", 'mumbai': "BOM", 'dubai': "DXB", 'bali': "BLC", 'singapore': "SIN", 'thailand': "BKK", 'tokyo': "HND", 'rio de janeiro': 134921, 'auckland': 109654, 'paris': "LBG", 'melbourne': 127718, 'london': "LHR", 'pondicherry': "PNY",  'port blair': "IXZ", 'daman': "NMB", "varanasi": "VNS", "banaras": "VNS","leh": "IXL", "dharamshala": "DHM", "meghalaya": "SHL", "shillong": "SHL", "kochi": "COK", 'gaya': "GAY", 'amritsar': "ATQ", 'kolkata':"CCU", 'tirupati': "TIR", 'shirdi': "SAG"
}

cities = ['chandigarh', 'goa', 'shimla', 'udaipur', 'new delhi','delhi', 'srinagar', 'mumbai', 'dubai' , 'bali', 'singapore', 'paris', 'melbourne', 'london', 'new york','newyork', 'pondicherry', 'port blair', 'daman', 'leh', 'varanasi', 'dharamshala', 'meghalaya', 'kochi', 'shirdi', 'kolkata', 'tirupati','amritsar','gaya']

months = ['january','february','march','april','may','june','july','august','september','october','november','december']

month_mapping = {
    "01": 31,
    "02": 29,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31,
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
        
    async def validate_origin(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `origin` value"""
        # print("i'm here2")
        if slot_value.lower() not in cities: 
            dispatcher.utter_message(text=f"Entered value is not accepted in our database yet")
            return {"origin": None}
        else:
            return {"origin": slot_value}
        
    async def validate_startDate(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `startDate` value"""
        # print("i'm here3")

        date_today = str(dt.date.today())
        if slot_value > date_today:
            return {"startDate": slot_value}
        else:
            dispatcher.utter_message(text=f"Enter a valid date starting from tomorrow")
            return {"startDate": None}
        
    async def validate_budget(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `budget` value"""
        # print("i'm here3")
        if slot_value.lower() not in ['low','low-mid','mid','high']:
            dispatcher.utter_message(text=f"Enter a valid budget, we only support 'low', 'low-mid', 'mid' and 'high'")
            return {"budget": None}
        else: 
            return {"budget": slot_value}
        
    async def validate_days(
            self, 
            slot_value: Any,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: DomainDict,
    ) -> Dict[Text,Any]:
        """Validate `days` value"""
        # print("i'm here3")
        if (type(slot_value)==int and slot_value>=3 and slot_value<=7) or (type(slot_value)==str and slot_value.isnumeric()):
            slot_value = int(slot_value)
            return {"days": slot_value}
        else: 
            dispatcher.utter_message(text=f"Enter valid number of days")
            return {"days": None}


class ActionFetchDetailsFromText(Action):
    def name(self) -> Text:
        # print("i'm here1")
        return "action_fetch_details_from_text"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        text_entered = tracker.latest_message.get("text")
        place_attr, origin_attr, startdate_attr, budget_attr, days_attr = text_entered.split(",")
        
        placename = place_attr.split(":")[0].strip()
        placevalue = place_attr.split(":")[1].strip()
        originname = origin_attr.split(":")[0].strip()
        originvalue = origin_attr.split(":")[1].strip()
        startdatename = startdate_attr.split(":")[0].strip()
        startdatevalue = startdate_attr.split(":")[1].strip()
        budgetname = budget_attr.split(":")[0].strip()
        budgetvalue = budget_attr.split(":")[1].strip()
        daysname = days_attr.split(":")[0].strip()
        daysvalue = days_attr.split(":")[1].strip()

        print(text_entered)
        print(placename,placevalue,originname,originvalue,startdatename,startdatevalue,budgetname,budgetvalue,daysname,daysvalue)
        return [SlotSet(placename,placevalue), SlotSet(originname,originvalue), SlotSet(startdatename,startdatevalue), SlotSet(budgetname,budgetvalue), SlotSet(daysname,daysvalue)]


class ActionFetchHotels(Action):
    def name(self) -> Text:
        # print("i'm here1")
        return "action_fetch_hotels"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        print("Current Time =", current_time)
        
        destination = tracker.get_slot("place").lower()
        startDate = tracker.get_slot("startDate")
        budget = tracker.get_slot("budget").lower()
        origin = tracker.get_slot("origin")
        if not origin:
            origin = "delhi"
        origin = origin.lower()
        print("origin: ",origin)
        days_of_travel = int(tracker.get_slot("days"))
        rating = budget_mapping[budget]
        dest_city_code = city_codes[destination]

        print(destination,origin)

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
            price1 = float(f1.get("Fare").get("OfferedFare"))
            price2 = float(f2.get("Fare").get("OfferedFare"))
            if price1 < price2:
                return -1
            else:
                return 1

        total_price = 0
        hotel_details=[]
        
        
        start_date_obj = datetime.strptime(startDate, '%Y-%m-%d')
        result_date_obj = start_date_obj + timedelta(days=days_of_travel)
        last_day= result_date_obj.strftime('%Y-%m-%d')
        
        hotel_body = {
            "CheckIn": startDate,
            "CheckOut": last_day,
            "HotelCodes": "",
            "CityCode": str(dest_city_code),
            "CityName": destination.capitalize(),
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
        
        hotel_response = requests.post("http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch",json=hotel_body,auth=("hackathontest","Hac@48298799")).json()
        
        temp_hotel_details=[]
        if hotel_response.get("Status").get("Code")==200:
            print("here")
            if hotel_response.get("HotelSearchResults"):
                temp = sorted(hotel_response.get("HotelSearchResults"),key=cmp_to_key(compare_hotels))

                for hotel in temp:
                    if hotel.get("HotelInfo").get("Rating") in rating:
                        total_price += hotel.get("MinHotelPrice").get("TotalPrice")
                        break
                for hotel in temp:
                    if len(temp_hotel_details) == 3: break
                    if hotel.get("HotelInfo").get("Rating") in rating:
                        temp_hotel_details.append(hotel)

        # print(temp_hotel_details)
        print("Hotel Price = ", total_price*83.19)


        flight_body = {
            "EndUserIp": "192.168.10.10",
            "TokenId": "d016816e-7ef4-4d76-9c48-667a7edd70b5",
            "AdultCount": "1",
            "ChildCount": "0",
            "InfantCount": "0",
            "DirectFlight": "false",
            "OneStopFlight": "false",
            "JourneyType": "2",
            "PreferredAirlines": None,
            "Segments": [
                {
                    "Origin": airport_codes[origin],
                    "Destination": airport_codes[destination],
                    "FlightCabinClass": "1",
                    "PreferredDepartureTime": startDate + "T00: 00: 00",
                    "PreferredArrivalTime": startDate + "T00: 00: 00"
                },
                {
                    "Origin": airport_codes[destination],
                    "Destination": airport_codes[origin],
                    "FlightCabinClass": "1",
                    "PreferredDepartureTime": last_day + "T00: 00: 00",
                    "PreferredArrivalTime": last_day + "T00: 00: 00"
                },
            ],
            "Sources": None
        }
        print("FLIGHT BODY", flight_body)
        flight_response = requests.post("http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search",json=flight_body,auth=("Hackathon","Hackathon@1234")).json().get("Response")
        print(flight_response)
        flight_cost = 0
        depart_flight=[]
        return_flight=[]
        if flight_response.get("ResponseStatus") == 1:
            if flight_response.get("Results"):
                # print("here1")
                depart_flight_temp = flight_response.get("Results")[0]
                return_flight_temp = flight_response.get("Results")[1]
                # print("here2")
                depart_flight = sorted(depart_flight_temp,key=cmp_to_key(compare_flight))
                return_flight = sorted(return_flight_temp,key=cmp_to_key(compare_flight))
                # print("here3")
                temp_depart = depart_flight[0]
                temp_return = return_flight[0]
                flight_cost = temp_depart.get("Fare").get("PublishedFare") + temp_return.get("Fare").get("PublishedFare")


        print("Flight Cost = ",flight_cost)

        total_price += flight_cost

        # depart_flight_details = temp_depart
        # arrival_flight_details = temp_return
        hotel_details = temp_hotel_details

        morning_departure = {} # anything bw 12 am to 12pm
        afternoon_departure = {} # anything bw 12pm to 5pm 
        evening_departure = {} # anything bw 5pm to 12am

        morning_arrival = {} # anything bw 12 am to 12pm
        afternoon_arrival = {} # anything bw 12pm to 5pm
        evening_arrival = {} # anything bw 5pm to 12am

        for flight in depart_flight:
            if bool(morning_departure) and bool(afternoon_departure) and bool(evening_departure): break
            hour = int(flight.get("Segments")[0][0].get("Origin").get("DepTime").split("T")[1].split(":")[0])
            if hour >=0 and hour <12 and (not morning_departure):
                morning_departure = flight
            elif hour>=12 and hour<17 and (not afternoon_departure):
                afternoon_departure = flight
            elif hour>=17 and hour<=24 and (not evening_departure):
                evening_departure = flight

        for flight in return_flight:
            if bool(morning_arrival) and bool(afternoon_arrival) and bool(evening_arrival): break
            hour = int(flight.get("Segments")[0][0].get("Origin").get("DepTime").split("T")[1].split(":")[0])
            if hour >=0 and hour <12 and (not morning_arrival):
                morning_arrival = flight
            elif hour>=12 and hour<17 and (not afternoon_arrival):
                afternoon_arrival = flight
            elif hour>=17 and hour<=24 and (not evening_arrival):
                evening_arrival = flight

        departureDetails = []
        if len(morning_departure):
            departureDetails.append(morning_departure)
        if len(afternoon_departure):
            departureDetails.append(afternoon_departure)
        if len(evening_departure):
            departureDetails.append(evening_departure)
        arrivalDetails = []
        if len(morning_arrival):
            arrivalDetails.append(morning_arrival)
        if len(afternoon_arrival):
            arrivalDetails.append(afternoon_arrival)
        if len(evening_arrival):
            arrivalDetails.append(evening_arrival)
        result = {
            "DepartureFlightDetails": departureDetails,
            "HotelDetailsList": hotel_details,
            "ArrivalFlightDetails": arrivalDetails
        }

        print(result)
        dispatcher.utter_message(json.dumps(result))
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        print("Current Time =", current_time)
        return []

