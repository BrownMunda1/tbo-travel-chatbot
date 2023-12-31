
import React from 'react';
import loading from './loading.gif'

const Spinner = () => {
    
    return <div className='h-full text-center opacity-35 z-50 bg-black'>
        <img className='my-4' src={loading} alt="loading" />
    </div>;
}

export default Spinner;
