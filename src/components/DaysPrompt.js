import React,{useState} from 'react';
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

export default function DaysPrompt(props) {
    const categories = ['3','4','5','6','7'];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="No. of Days" />
            <ListGroup type="days" list={categories} setDays={props.setDays} setResponse={setResponse}/>
            {response === ""?"":<Response response={response}/>}
        </>
    );
}