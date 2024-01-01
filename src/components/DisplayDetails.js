import React from "react";
import Card from "./Card";
import "../App.css";

const DisplayDetails = (props) => {
    return (
        <div className="flex justify-center">
            <div className="absolute bg-[#f7f9fa99] py-3 p-10 my-20 rounded-lg">
                <h1 className="flex justify-center font-20 font-bold mb-3">Flight Recommendations</h1>
                <div className="flex justify-center gap-5">
                    <Card />
                    <Card />
                    <Card />
                </div>
                <div className="flex justify-center gap-5 mt-3">
                    <Card />
                    <Card />
                    <Card />
                </div>

                <h1 className="flex justify-center font-bold my-3">Hotel Recommendations</h1>
                <div className="flex justify-center gap-5">
                    <Card />
                    <Card />
                    <Card />
                </div>
                <div className='flex justify-center pt-3'>
                <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={props.handleItinerary}>Create an Itinerary</button>
                </div>
            </div>
        </div>
    );
}

export default DisplayDetails