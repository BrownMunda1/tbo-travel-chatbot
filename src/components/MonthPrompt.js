import React from 'react';
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";

function MonthPrompt(){
    const categories = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return (
        <>
            <QuePrompt question="Month" />
            <ListGroup list={categories}/>
        </>
    );
}

export default MonthPrompt;