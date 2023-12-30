import React, {useState} from 'react';
import QuePrompt from './QuePrompt';
import Response from './Response';


export default function OriginPrompt({setOrigin}) {
    const [response, setResponse] = useState("");
    let input="";
    const handleInputChange = (e) => {
        const value = e.target.value;
        // console.log(value);
        input=value;
      };
    const handleClick = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
        // console.log(value);
        setOrigin(input);
        setResponse(input);
    };

    return (
        <>
            <QuePrompt question="Which city would you be departing from...?"/>
            
            <input type="text" id="base-input" className="ml-10 my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..." name="origin" onChange={handleInputChange}/>
            <button onClick={handleClick}>Enter</button>
            {response === ""?"":<Response response={response}/>}
        </>
    );
}
