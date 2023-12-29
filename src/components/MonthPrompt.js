import React,{useState} from 'react';
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function MonthPrompt(props){
    const categories = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="Month" />
            {response === ""?<ListGroup type="month" list={categories} setMonth={props.setMonth} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response}/>}
        </>
    );
}

export default MonthPrompt;