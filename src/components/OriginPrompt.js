import React from 'react';
import QuePrompt from './QuePrompt';

export default function OriginPrompt() {
    // const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="Which city would you be departing from...?"/>
            <input type="text" id="base-input" class="ml-10 my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..."/>
            {/* {response === ""?"":<Response response={response}/>} */}
        </>
    );
}
