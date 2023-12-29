import React from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";

function BudgetPrompt() {
    const categories = ['Low', 'Low-Mid', 'Mid', 'High'];

    return (
        <>
            <QuePrompt question="Budget"/>
            <ListGroup list={categories}/>
        </>
    );
}

export default BudgetPrompt;