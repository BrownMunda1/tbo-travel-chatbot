import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import OriginPrompt from './components/OriginPrompt';
import StartDatePrompt from './components/StartDatePrompt';
import TravelMoodPrompt from './components/TravelMoodPrompt';
import DisplayDetails from './components/DisplayDetails';
import { OpenAI } from "openai";
import Spinner from './components/Spinner';
import ItineraryDetails from "./components/ItineraryDetails";


function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelMood, setTravelMood] = useState("");
  const [origin, setOrigin] = useState("")
  const [startDate, setStartDate] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryData, setItineraryData] = useState();

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
    "01":"Janurary",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
  }
  const handleItinerary = async (e) => {
    console.log("here");
    setLoading(true);
    let year = startDate.split("-")[0];
    let month = month_mapping[startDate.split("-")[1]];
    let date = startDate.split("-")[2];
    const prompt = `Give me an itinerary for ${city} for ${days} days in starting ${date}th ${month} ${year}`;
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
    setLoading(false);
  }


  return (
    <div>

      {loading && <Spinner />}
      {showModal && <DisplayDetails handleItinerary={handleItinerary} data={data} showItinerary={showItinerary} />}

      <nav className=" border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <img src={require('./images/logo.png')} className="h-8 z-7" alt="Flowbite Logo" />
        </div>
      </nav>


      {!showModal && <div className="flex justify-center items-center h-fit my-5">
        <div className="chatbot-container">

          <CategoryPrompt setCategory={setCategory} />
          {category === "" ? "" : <CityPrompt category={category} setCity={setCity} />}
          {city === "" ? "" : <BudgetPrompt setBudget={setBudget} />}
          {budget === "" ? "" : <DaysPrompt setDays={setDays} />}
          {days === "" ? "" : <OriginPrompt setOrigin={setOrigin} />}
          {origin === "" ? "" : <StartDatePrompt setStartDate={setStartDate} />}
          {startDate === "" ? "" : <TravelMoodPrompt setTravelMood={setTravelMood} />}
          {travelMood === "" ? "" : <div className='flex justify-center items-center gap-3'>
            <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={handleSubmit}>Generate Result</button>
          </div>}
        </div>
      </div>}
      {showItinerary && <ItineraryDetails data={JSON.parse(itineraryData)} />}
    </div>
  );
}

      export default App;
