import React from "react";
import ListGroup from "./ListGroup";
import QuePrompt from "./QuePrompt";

function CategoryPrompt() {
    const categories = ['Beach', 'Foreign', 'Mountains', 'Cityscapes'];

    return (
        <>
            <QuePrompt question="Where do you want to travel...??"/>
            <ListGroup list={categories}/>
        </>
    );
}

export default CategoryPrompt;