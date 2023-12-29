import React,{useState} from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function CategoryPrompt(props) {
    const categories = ['Beach', 'Foreign', 'Mountains', 'Cityscapes'];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="Where do you want to travel...??"/>
            {response === ""?<ListGroup type="category" list={categories} setCategory= {props.setCategory} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response}/>}
        </>
    );
}

export default CategoryPrompt;