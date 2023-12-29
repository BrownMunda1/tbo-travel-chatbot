import React from 'react';
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";

export default function DaysPrompt() {
    const categories = ['3','4','5','6','7'];
    return (
        <>
            <QuePrompt question="No. of Days" />
            <ListGroup list={categories}/>
        </>
    );
}
