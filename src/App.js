import React, { useState } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
// import MonthPrompt from './components/MonthPrompt';
import OriginPrompt from './components/OriginPrompt';
import StartDatePrompt from './components/StartDatePrompt';
import axios from 'axios';


function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  // const [month, setMonth] = useState("");
  const [days, setDays] = useState("");
  const [origin,setOrigin] = useState("")
  const [startDate,setStartDate] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `/inform{"place": "${city}", "days": "${days}", "budget": "${budget}", "origin": "${origin}", "startDate": "${startDate}"}`;
    const body = JSON.stringify({ "sender": "Sharmaji Family", "message": message })
    axios.post("localhost:5005/webhooks/rest/webhook/",body).then(
      (response)=>{
        console.log(response);
      }
    );
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
          {/* {budget === ""?"":<MonthPrompt setMonth={setMonth}/>} */}
          {budget === ""?"":<DaysPrompt setDays={setDays}/>}
          {days === ""?"":<OriginPrompt setOrigin={setOrigin}/>}
          {origin === ""?"": <StartDatePrompt setStartDate={setStartDate} /> }
          {startDate === ""?"": <button onClick={handleSubmit}>Generate Result</button> }
          
        </div>
      </div>
    </div>
    
  );
}

export default App;
