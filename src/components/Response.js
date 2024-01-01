import React from 'react';

export default function Response(props) {
  return (
    <div className="flex justify-end gap-2.5 mb-3">
            <div className="flex flex-col w-fit max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#7EC1F5] rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{props.response}</span>
                </div>
            </div>
            <img className="w-8 h-8 rounded-full" src={require('../images/userbot.png')} alt="" />
        </div>
  )
}
