import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import OriginPrompt from './components/OriginPrompt';
import StartDatePrompt from './components/StartDatePrompt';
import DisplayDetails from './components/DisplayDetails';
import { OpenAI } from "openai";
import Spinner from './components/Spinner';
import ItineraryDetails from "./components/ItineraryDetails";
import Basic from './components/Basic';
import axios from 'axios';
import TravelMoodPrompt from './components/TravelMoodPrompt';

function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState(3);
  const [travelMood, setTravelMood] = useState("");
  const [origin, setOrigin] = useState("")
  const [startDate, setStartDate] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryData, setItineraryData] = useState();

  const [showBasic, setShowBasic] = useState(false);

  const [hotel, setHotel] = useState({})
  const [departureFlight, setDepartureFlight] = useState({})
  const [arrivalFlight, setArrivalFlight] = useState({})


  useEffect(() => {
    setCategory("")
    setCity("")
    setBudget("")
    setDays("")
    setTravelMood("")
    setOrigin("")
    setStartDate("")
  }, [])


  const fetchData = async () => {
    const message = `place: ${city}, origin: ${origin}, startDate: ${startDate}, budget: ${budget}, days: ${days}`;
    const body = JSON.stringify({ "sender": "Sharmaji Family", "message": message });
    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
      },
      body: body
    })
    const json = await response.json();
    console.log(json);
    console.log(JSON.parse(json[1]["text"]));
    setData(JSON.parse(json[1]["text"]));
    setLoading(false);
    setShowModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  }
  const month_mapping = {
    "01": "Janurary",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  }
  const handleItinerary = async (e) => {
    console.log("here");
    console.log("days", days);
    setLoading(true);
    let year = startDate.split("-")[0];
    let month = month_mapping[startDate.split("-")[1]];
    let date = startDate.split("-")[2];
    const prompt = `Give me an itinerary for ${city} for ${days} days in starting ${date}th ${month} ${year}. Give me an array of objects, each having the activites of each day so that I can uniformly use it in my project for extraction`;
    console.log(prompt);

    const client = new OpenAI({
      apiKey: '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',
      dangerouslyAllowBrowser: true
    });
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content); // itinerary response
    setShowItinerary(true);
    setItineraryData(completion.choices[0].message.content);
    setShowModal(false);
    setLoading(false);
  }
  const handleChatWithAI = (e) => {
    setShowBasic(true);
    setShowItinerary(false);
  }

  const handleShit = async (e) => {
    // const response = await GptResponse('hi tell me something about yourself strictly in json format');
    setLoading(true);
    console.log("here");
    console.log("hotel", hotel);
    console.log("departure", departureFlight);
    console.log("arrival", arrivalFlight);
    const prompt = 
    `Please create a detailed itinerary for a ${days}-day trip starting from ${startDate} to ${city}, for a ${travelMood} trip with a ${budget} budget.
    Here are our flights and hotel details:
    Departure Flight: ${JSON.stringify(departureFlight)},
    Hotel: ${JSON.stringify(hotel)},
    Arrival Flight: ${JSON.stringify(arrivalFlight)}
    Prioritize visiting the best places near the hotel first, and provide specific dining recommendations. Also keep in mind the timings of the departure and arrival flights. If possible give the best timings of visiting and the distance from the hotel along with the prices. Provide itinerary strictly in the following json object form:
    {[
     Day:1, //Daywise itinerary, preferably including the best timings 

     PlacesToVisit: [/* Fill in the places to be included in itinerary*/],

     PlacesToEatNearby: {/* Provide with 2-3 cafe options */}
    ],
    ...
    }
    I'm saying again, I want the result to be only an JSON object, no intro and outro texts, and the JSON object should be strictly in the above mentioned format without bold text and without comments.
    `
    console.log(prompt);
    const payload = {
      prompt: prompt
    };
    const authHeader = `Bearer chatgpt_BFpXPpTVj1GvAqmdgJomJa`;
    const headers = {
      Authorization: authHeader,
    };

    const response = await axios.post("https://ankit-cors-anywhere.onrender.com/https://ai.rnilaweera.ovh/api/v1/user/bard", payload, { headers });
    console.log(response.data.message);
    const answer = JSON.parse(response.data.message);
    console.log(answer,typeof(answer));
    setLoading(false);
    // const answer = response.data.message;
    // console.log(answer,typeof(answer));
  }

  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });

  return (
    <div>
    <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#3C9C61] rounded-lg dark:bg-gray-700' onClick={handleShit}>TEST AI</button>
      {loading && <Spinner />}
      {showModal && <DisplayDetails handleItinerary={handleShit} data={data} showItinerary={showItinerary} setArrivalFlight={setArrivalFlight} setDepartureFlight={setDepartureFlight} setHotel={setHotel} />}

      <nav className=" border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <img src={require('./images/logo.png')} className="h-8 z-7" alt="Flowbite Logo" />
        </div>
      </nav>


      {showBasic && <Basic setData={setData} setShowBasic={setShowBasic} setShowModal={setShowModal} setLoading={setLoading} />}


      {!showBasic && !showModal && !showItinerary && <div className="flex justify-center items-center h-fit my-5 ">
        <div className="chatbot-container" >
          <CategoryPrompt setCategory={setCategory} />
          {category === "" ? "" : <CityPrompt category={category} setCity={setCity} />}
          {city === "" ? "" : <BudgetPrompt setBudget={setBudget} />}
          {budget === "" ? "" : <DaysPrompt setDays={setDays} />}
          {days === "" ? "" : <OriginPrompt setOrigin={setOrigin} />}
          {origin === "" ? "" : <StartDatePrompt setStartDate={setStartDate} />}
          {startDate === "" ? "" : <TravelMoodPrompt setTravelMood={setTravelMood} />}
          {travelMood ==="" ? "" : <div className='flex justify-center items-center gap-3'>
            <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#3C9C61] rounded-lg dark:bg-gray-700' onClick={handleSubmit}>Generate Result</button>
          </div>}
        </div>
      </div>}
      {showItinerary && <ItineraryDetails data={JSON.parse(itineraryData)} setShowItinerary={setShowItinerary} />}
      {!showBasic && !showModal && !showItinerary && <div className='flex justify-center items-center mt-3'>

        <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#3C9C61] rounded-lg dark:bg-gray-700' onClick={handleChatWithAI}>Chat with AI</button>
      </div>}
    </div>
  );
}

export default App;
