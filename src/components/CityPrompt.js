import React,{useState} from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function CityPrompt({setCity}) {
    // const BeachList = ['Goa','Kochi','Daman','Port Blair','Pondicherry'];
    // const ForeignList = ['Bali','Paris','Dubai','London','Singapore'];
    // const MountainsList = ['Leh','Shimla','Srinagar','Meghalaya','Dharamshala'];
    // const CityscapesList = ['Delhi','Mumbai','Udaipur','Kolkata','Chandigarh'];
    // const PilgrimageList = ['Gaya','Shirdi','Tirupati','Amritsar', 'Varanasi'];

    // let CitiesList = [];
    // if(props.category === "Beach") CitiesList = BeachList; 
    // else if(props.category === "Foreign") CitiesList = ForeignList; 
    // else if(props.category === "Mountains") CitiesList = MountainsList; 
    // else if(props.category === "Cityscapes") CitiesList = CityscapesList;
    // else if(props.category === "Pilgrimage") CitiesList = PilgrimageList;


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
        setCity(input);
        setResponse(input);
    };

    return (
        <>
            {/* <QuePrompt question="Here are some of the most visited and top recommendations"/>
            {response === ""?<ListGroup type="city" list={CitiesList} setCity= {props.setCity} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response}/>} */}
            <QuePrompt question="Which city would you like to travel...?"/>
            <div className='flex items-center gap-3'>
            <input type="text" id="base-input" className="ml-10 my-3 bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type..." name="origin" onChange={handleInputChange}/>
            <button className='h-fit w-fit max-w-[320px] p-3 text-black border-gray-200 shadow-lg bg-[#3C9C61] transition duration-300 ease-in-out hover:shadow-mdanimate-pulse rounded-lg dark:bg-gray-700' onClick={handleClick}>Enter</button>
            </div>
            {response === ""?"":<Response response={response}/>}
        </>
    );
}

export default CityPrompt;