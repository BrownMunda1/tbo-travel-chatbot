import React from "react";
import HotelCard from "./HotelCard";
import FlightCard from "./FlightCard";
import "../App.css";

const DisplayDetails = ({handleItinerary, data}) => {
    // console.log("details: ", props.data);
    return (
        <div className="flex justify-center">
            <div className="absolute bg-[#f7f9fa99] py-3 p-10 my-20 rounded-lg">
                <h1 className="flex justify-center font-40 text-3xl font-bold mb-3">Departure Flight Recommendations</h1>
                <p className="text-center mb-4 text-sm">Best Flights for Morning, Afternoon and Evening Departure as per availability</p>
                <div className="flex justify-center gap-5">
                    {
                        data['DepartureFlightDetails'].map((data) => {
                            console.log("here: ",data);
                            return (
                                <FlightCard key={data['ResultIndex']} data={data} />
                            )
                        })
                    }
                </div>

                <h1 className="flex justify-center font-40 text-3xl font-bold my-3">Hotel Recommendations</h1>
                <p className="text-center mb-4 text-sm">Top 5 Budget Hotels (Price per Room)</p>
                <div className="flex justify-center gap-5">
                    {
                        data['HotelDetailsList'].map((data) => {
                            return (
                                <HotelCard key={data['HotelBookingCode']} data={data} />
                            )
                        })
                    }
                </div>
                <h1 className="flex justify-center font-40 text-3xl font-bold mb-3">Arrival Flight Recommendations</h1>
                <p className="text-center mb-4 text-sm">Best Flights for Morning, Afternoon and Evening Departure as per availability</p>
                <div className="flex justify-center gap-5">
                    {
                        data['ArrivalFlightDetails'].map((data) => {
                            return (
                                <FlightCard key={data['ResultIndex']} data={data} />
                            )
                        })
                    }
                </div>
                <div className='flex justify-center pt-3'>
                    <button className='h-fit w-fit max-w-[320px] p-3 border-gray-200 bg-[#87DAEC] rounded-lg dark:bg-gray-700' onClick={handleItinerary}>Create an Itinerary</button>
                </div>
            </div>
        </div>
    );
}

export default DisplayDetails