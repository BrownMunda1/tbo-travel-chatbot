import React,{useState} from 'react';
import QuePrompt from './QuePrompt';
import Response from './Response';

export default function StartDatePrompt({setStartDate}) {
    const [response, setResponse] = useState("");
    let date = null;
    const handleChange = (e) => {
        date = e.target.value;
    }

    const handleSubmit = (e) =>{
        // console.log(typeof(date));
        setResponse(date);
        setStartDate(date);
    }

    return (
        <>
            <QuePrompt question="Around which date you be leaving ...?"/>
            {/* <input type="date" id="base-input" className="ml-10 my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..." onchange={handleChange}/> */}
            <input type="date" id="base-input" onChange={handleChange} />
            <button onClick={handleSubmit}>Confirm Date</button>
            {response === ""?"":<Response response={response}/>}
        </>
    );
}
