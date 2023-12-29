import React from 'react';

const QuePrompt = (props) => {
    return (
        <div className="flex items-start gap-2.5">
            <img className="w-8 h-8 rounded-full" src={require('../images/chatbot_icon.png')} alt="" />
            <div className="flex flex-col w-fit max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#307fe2] rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{props.question}</span>
                </div>
            </div>
        </div>
    )
}

export default QuePrompt;
