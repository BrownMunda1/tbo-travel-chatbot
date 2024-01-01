import React from 'react';

export default function FlightCard({data}) {
    return (
        
        <div className="w-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow sm:px-5 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl mt-2 font-bold text-black-500 dark:text-gray-400">{data['Segments'][0][0]['Origin']['Airport']['CityName']} - {data['Segments'][0][0]['Destination']['Airport']['CityName']}</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-2xl font-semibold">₹</span>
                <span className="text-3xl ml-1 font-extrabold tracking-tight">{data['Fare']['OfferedFare']}</span>
            </div>
            <ul role="list" className="space-y-3 my-3">
                <li className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"> {data['Segments'][0][0]['Origin']['DepTime'].split("T")[1].split(":")[0]< 12 ? "Morning": data['Segments'][0][0]['Origin']['DepTime'].split("T")[1].split(":")[0]< 17 ? "Afternoon": "Evening"} Departure</span>
                </li>
                <li className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Departure: {data['Segments'][0][0]['Origin']['DepTime'].split("T")[1].split(":")[0] + ":"+ data['Segments'][0][0]['Origin']['DepTime'].split("T")[1].split(":")[1]} IST</span>
                </li>
                <li className="flex">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Arrival: {data['Segments'][0][0]['Destination']['ArrTime'].split("T")[1].split(":")[0] + ":"+ data['Segments'][0][0]['Destination']['ArrTime'].split("T")[1].split(":")[1]} IST</span>
                </li>
                <li className="flex">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Flight Name: {data['Segments'][0][0]['Airline']['AirlineName']}</span>
                </li>
                
            </ul>
            <button type="button" className="mb-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Book Flight</button>
        </div>

    )
}
