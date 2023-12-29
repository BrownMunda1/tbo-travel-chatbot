import React, { useState } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import MonthPrompt from './components/MonthPrompt';

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#f36b21] block max-w-sm p-6 border border-gray-200 rounded-lg h-fit w-96 gap-2.5">

        <CategoryPrompt/>
        <CityPrompt/>
        <BudgetPrompt/>
        <MonthPrompt/>
        <DaysPrompt/>
      </div>
    </div>
    
  );
}

export default App;
