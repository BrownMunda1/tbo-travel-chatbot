import React from 'react';

function ListGroup(props) {
    const toggle = (element) => {
        if (props.type === "category"){
            props.setCategory(element);
            props.setResponse(element);
        }
        else if (props.type === "city"){
            props.setCity(element);
            props.setResponse(element);
        }
        else if (props.type === "budget"){
            props.setBudget(element);
            props.setResponse(element);
        }
        else if (props.type === "month"){
            props.setMonth(element);
            props.setResponse(element);
        }
        else if (props.type === "days"){
            props.setDays(element);
            props.setResponse(element);
        }
        else if (props.type==="travelMood"){
            props.setTravelMood(element);
            props.setResponse(element);
        }
      }
    return (
        <>
            <div className="my-3 ml-10 w-48 text-sm font-medium text-gray-900 bg-[#307fe2] border border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
                {props.list.map((element) => {
                    return <button key={element} onClick={() => toggle(element)} type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        {element}
                    </button>
                })}
            </div>
        </>
    )
}

export default ListGroup;