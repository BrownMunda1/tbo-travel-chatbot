import React,{useState} from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function CityPrompt(props) {
    const BeachList = ['Goa','Kochi','Daman','Port Blair','Pondicherry'];
    const ForeignList = ['Bali','Paris','Dubai','London','Singapore'];
    const MountainsList = ['Leh','Shimla','Srinagar','Meghalaya','Dharamshala'];
    const CityscapesList = ['Delhi','Mumbai','Udaipur','Kolkata','Chandigarh'];
    const PilgrimageList = ['Gaya','Shirdi','Tirupati','Amritsar', 'Varanasi'];

    let CitiesList = [];
    if(props.category === "Beach") CitiesList = BeachList; 
    else if(props.category === "Foreign") CitiesList = ForeignList; 
    else if(props.category === "Mountains") CitiesList = MountainsList; 
    else if(props.category === "Cityscapes") CitiesList = CityscapesList;
    else if(props.category === "Pilgrimage") CitiesList = PilgrimageList;

    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="Here are some of the most visited and top recommendations"/>
            {response === ""?<ListGroup type="city" list={CitiesList} setCity= {props.setCity} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response}/>}
        </>
    );
}

export default CityPrompt;