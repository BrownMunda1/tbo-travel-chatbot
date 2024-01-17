import React,{useState} from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function CategoryPrompt(props) {
    const categories = ['Beach', 'Nature', 'Wildlife', 'Mountains', 'Cityscapes', 'Pilgrimage'];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="Thinking about your dream destination, where would you like to travel...?"/>
            {response === ""?<ListGroup type="category" list={categories} setCategory= {props.setCategory} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response} setResponse={setResponse} edit="edit"/>}
        </>
    );
}

export default CategoryPrompt;
