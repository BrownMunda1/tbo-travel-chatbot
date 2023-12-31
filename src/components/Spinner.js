import React from 'react';
import loading from "../images/200w.gif";

const Spinner = () => {
    
    return <div className='absolute h-screen w-full flex items-center justify-center opacity-35 z-50 bg-black'>
        <img className='my-4' src={loading} alt="loading" />
    </div>;
}

export default Spinner;
