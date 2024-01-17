import React,{useState} from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";
import Response from "./Response";

function BudgetPrompt(props) {
    const categories = ['Economy', 'Premium', 'Luxury'];
    const [response, setResponse] = useState("");

    return (
        <>
            <QuePrompt question="To help plan your ideal trip, could you please provide an estimated budget range for your journey?"/>
            {response === ""?<ListGroup type="budget" list={categories} setBudget={props.setBudget} setResponse={setResponse}/>:""}
            {response === ""?"":<Response response={response} setResponse={setResponse} edit="edit"/>}
        </>
    );
}

export default BudgetPrompt;