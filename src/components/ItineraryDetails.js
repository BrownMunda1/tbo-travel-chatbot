import React from 'react'

export default function ItineraryDetails({ data, setShowItinerary }) {
    console.log(typeof (data));
    console.log("here2 itinerary data: ", data['itinerary']);
    const month_mapping = {
        "01": "Janurary",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const handleClick = (e) => {
        e.preventDefault();
        setShowItinerary(false);
    }
    return (

        <div>
            <div className="h-full flex items-center justify-center">
                <div className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h1 className='text-center text-2xl font-bold mb-3'>Itinerary for your Vacation</h1>
                    <div>
                        <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {
                                data["itinerary"].map((data, index) => {
                                    console.log("here1: ", data);
                                    console.log("here3: ", typeof (data))
                                    return (
                                        <li className="mb-10 ms-6">
                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                </svg>
                                            </span>
                                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Day {index + 1}</h3>
                                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{data['date']}</time>
                                            {
                                                data['activities'].map((activity) => {
                                                    return (
                                                        <div className='flex my-3'>

                                                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500 my-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                            </svg>
                                                            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{activity}</span>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </li>
                                    )
                                })
                            }

                        </ol>
                    </div>
                </div>
            </div>
            <div className='flex justify-center pt-3 mb-3'>
                <button className='h-fit w-fit max-w-[320px] p-3 text-white border-gray-200 bg-blue-700 rounded-lg dark:bg-gray-700' onClick={handleClick}>Return to Home Page</button>
            </div>
            
        </div>
    );
}
