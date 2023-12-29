import React, { useState } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import MonthPrompt from './components/MonthPrompt';
import OriginPrompt from './components/OriginPrompt';

function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [month, setMonth] = useState("");
  const [days, setDays] = useState("");
  const [origin, setOrigin] = useState("");
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="chatbot-container">
        <CategoryPrompt setCategory={setCategory}/>
        {category === ""?"":<CityPrompt category={category} setCity={setCity}/>}
        {city === ""?"":<BudgetPrompt setBudget={setBudget}/>}
        {budget === ""?"":<MonthPrompt setMonth={setMonth}/>}
        {month === ""?"":<DaysPrompt setDays={setDays}/>}
        {days === ""?"":<OriginPrompt setDays={setOrigin}/>}
      </div>
    </div>
    
  );
}

export default App;
