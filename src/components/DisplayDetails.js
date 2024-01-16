import React, { useState } from "react";
import HotelCard from "./HotelCard";
import FlightCard from "./FlightCard";
import "../App.css";

const DisplayDetails = ({ handleItinerary, data, setHotel, setDepartureFlight, setArrivalFlight }) => {


    return (
        <div className="flex justify-center">
            <div className="absolute bg-[#f7f9fa99]  px-10 my-16 rounded-lg">
                <div className="flex justify-center gap-20">
                    <div>
                        <h1 className="flex justify-center font-40 text-3xl font-bold my-4">Departure Flight Recommendations</h1>
                        <div className="flex justify-center gap-5">
                            {
                                data['DepartureFlightDetails'].map((data) => {
                                    console.log("here: ", data);
                                    return (
                                        <FlightCard key={data['ResultIndex']} data={data} isDeparture={true} setDepartureFlight={setDepartureFlight} setArrivalFlight={setArrivalFlight} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-[1px] h-72 mt-8 bg-slate-500"></div>
                    <div>
                        <h1 className="flex justify-center font-40 text-3xl font-bold my-4">Arrival Flight Recommendations</h1>
                        <div className="flex justify-center gap-5">
                            {
                                data['ArrivalFlightDetails'].map((data) => {
                                    return (
                                        <FlightCard key={data['ResultIndex']} data={data} isDeparture={false} setDepartureFlight={setDepartureFlight} setArrivalFlight={setArrivalFlight} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-center text-sm my-3">Best Flights for Morning, Afternoon and Evening Departure as per availability</p>
                    </div>
                <div className="h-[1px] bg-slate-500"></div>
                <h1 className="flex justify-center font-40 text-3xl font-bold my-2">Hotel Recommendations</h1>
                <p className="text-center mb-3 text-sm">Top 3 Budget Hotels (Price/Room for overall stay)</p>
                <div className="flex justify-center gap-5">
                    {
                        data['HotelDetailsList'].map((data) => {
                            return (
                                <HotelCard key={data['HotelBookingCode']} data={data} setHotel={setHotel} />
                            )
                        })
                    }
                </div>
                <div className='flex justify-center pt-3 mb-3'>
                    <button className='h-fit w-fit max-w-[320px] p-3 text-white border-gray-200 bg-blue-700 rounded-lg dark:bg-gray-700' onClick={handleItinerary}>Create an Itinerary</button>
                </div>
            </div>
        </div>
    );
}

export default DisplayDetails
