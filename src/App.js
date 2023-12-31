import React, { useState } from 'react';
import "./App.css";
import BudgetPrompt from './components/BudgetPrompt';
import CategoryPrompt from './components/CategoryPrompt';
import CityPrompt from './components/CityPrompt';
import DaysPrompt from './components/DaysPrompt';
import OriginPrompt from './components/OriginPrompt';
import StartDatePrompt from './components/StartDatePrompt';
import DisplayDetails from './components/DisplayDetails';
import {OpenAI} from "openai";


function App() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [origin, setOrigin] = useState("")
  const [startDate, setStartDate] = useState("")
  const [showDetails, setShowDetails] = useState(false);

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

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  const handleItinerary = async (e) => {
    console.log("here");

    // const configuration = new Configuration({
    //   apiKey: "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",
    // });
  
    // const openai = new OpenAIApi(configuration);
    const prompt = `Give me an itinerary for Chandigarh for 2 days in low budget starting 26th jan 2024`;
    console.log(prompt);
    // const result = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: prompt,
    //   temperature: 0.5,
    //   max_tokens: 4000,
    // });
    // console.log(result);
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

    
    // await fetch("https://api.openai.com/v1/chat/completions", 
    // {
    //   method: "POST",
    //   headers: {
    //     "Authorization": "Bearer " + API_KEY,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(apiRequestBody)
    // }).then((data) => {
      
    //   return data.json();

    // }).then((data) => {
    //   console.log(data);
    //   setMessages([...chatMessages, {
    //     message: data.choices[0].message.content,
    //     sender: "ChatGPT"
    //   }]);
    //   setIsTyping(false);
    // });
  }

  return (
    <div>

      <nav className=" border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <img src={require('./images/logo.png')} className="h-8 z-7" alt="Flowbite Logo" />
        </div>
      </nav>

      <div className="flex justify-center items-center h-fit my-5">
        <div className="chatbot-container">
          <CategoryPrompt setCategory={setCategory} />
          {category === "" ? "" : <CityPrompt category={category} setCity={setCity} />}
          {city === "" ? "" : <BudgetPrompt setBudget={setBudget} />}
          {budget === "" ? "" : <DaysPrompt setDays={setDays} />}
          {days === "" ? "" : <OriginPrompt setOrigin={setOrigin} />}
          {origin === "" ? "" : <StartDatePrompt setStartDate={setStartDate} />}
          {startDate === "" ? "" : <div className='flex justify-center items-center gap-3'>
            <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={handleSubmit}>Generate Result</button>
          </div>}
          {showDetails && <DisplayDetails />}
        </div>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={handleItinerary}>Create an Itinerary</button>
      </div>
    </div>

  );
}

export default App;
