import React, { useState } from 'react';
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
    setLoading(false);
    setShowModal(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  }

  const handleItinerary = async (e) => {
    console.log("here");
    const prompt = `Give me an itinerary for Chandigarh for 2 days in low budget starting 26th jan 2024`;
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
    console.log(completion.choices[0].message.content);
  }

  return (
    <div>
      {loading && <Spinner/>}
      {showModal && <DisplayDetails handleItinerary={handleItinerary}/>}
      <nav className=" border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <img src={require('./images/logo.png')} className="h-8 z-7" alt="Flowbite Logo" />
        </div>
      </nav>

      {!showModal && <div className="flex justify-center items-center h-fit my-5">
        <div className="chatbot-container">

          <CategoryPrompt setCategory={setCategory}/>
          {category === ""?"":<CityPrompt category={category} setCity={setCity}/>}
          {city === ""?"":<BudgetPrompt setBudget={setBudget}/>}
          {budget === ""?"":<DaysPrompt setDays={setDays}/>}
          {days === ""?"":<OriginPrompt setOrigin={setOrigin}/>}
          {origin === ""?"": <StartDatePrompt setStartDate={setStartDate} /> }
          {startDate === ""?"":<TravelMoodPrompt setTravelMood={setTravelMood}/>}
          {travelMood === ""?"": <div className='flex justify-center items-center gap-3'>
                                  <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={handleSubmit}>Generate Result</button>
                                </div> }
          

        </div>
      </div>}
    </div>

  );
}

export default App;
