import React,{useState} from 'react';
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function TravelMoodPrompt(props) {
    const categories = ["Adventurous","Leisurely Escape","Cultural Exploration"];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="What kind of travel experience are you looking for?" />
            {response === ""?<ListGroup type="travelMood" list={categories} setTravelMood={props.setTravelMood} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response}/>}
        </>
    );
}
export default TravelMoodPrompt;