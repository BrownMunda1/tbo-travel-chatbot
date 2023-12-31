import React, { useState } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import OriginPrompt from './components/OriginPrompt';
import StartDatePrompt from './components/StartDatePrompt';
import TravelMoodPrompt from './components/TravelMoodPrompt';
import axios from 'axios';
import DisplayModal from './components/DisplayModal';

function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelMood, setTravelMood] = useState("");
  const [origin,setOrigin] = useState("")
  const [startDate,setStartDate] = useState("")
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const message = `place: ${city}, origin: ${origin}, startDate: ${startDate}, budget: ${budget}, days: ${days}`;
    const body = JSON.stringify({ "sender": "Sharmaji Family", "message": message });
    const response = await fetch("http://localhost:5005/webhooks/rest/webhook",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset':'UTF-8',
      },
      body: body
    })
    const json = await response.json();
    console.log(json);
    console.log(JSON.parse(json[1]["text"]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }
  
  return (
    <div>

      <nav className=" border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
              <img src={require('./images/logo.png')} className="h-8 z-7" alt="Flowbite Logo" />
        </div>
      </nav>

      <div className="flex justify-center items-center h-screen">
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
          {showModal && <DisplayModal />}
        </div>
      </div>
    </div>
    
  );
}

export default App;
