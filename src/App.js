import React from 'react';
import "./App.css";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#f36b21] block max-w-sm p-6 border border-gray-200 rounded-lg h-fit w-96 gap-2.5">

        <div class="flex items-start gap-2.5">
          <img class="w-8 h-8 rounded-full" src={require('./chatbot_icon.png')} alt=""/>
          <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#307fe2] rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">Where do you want to travel...??</span>
            </div>
          </div>

        </div>

        <div className="mt-3 ml-10 mb-3 w-48 text-sm font-medium text-gray-900 bg-[#307fe2] border border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Beach
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Cityscapes
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Mountains
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Foreign
          </button>
        </div>
        <div class="flex items-start gap-2.5">
          <img class="w-8 h-8 rounded-full" src={require('./chatbot_icon.png')} alt=""/>
          <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#307fe2] rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">Please select one of the following destinations</span>
            </div>
          </div>

        </div>

        <div className="mt-3 ml-10 mb-3 w-48 text-sm font-medium text-gray-900 bg-[#307fe2] border border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Beach
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Cityscapes
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Mountains
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Foreign
          </button>
        </div>
        <div class="flex items-start gap-2.5">
          <img class="w-8 h-8 rounded-full" src={require('./chatbot_icon.png')} alt="" />
          <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#307fe2] rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">Budget</span>
            </div>
          </div>

        </div>
        <div className="mt-3 ml-10 mb-3 w-48 text-sm font-medium text-gray-900 bg-[#307fe2] border border-gray-200 rounded-lg dark:border-gray-600 dark:text-white">
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Low
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            Medium
          </button>
          <button type="button" className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            High
          </button>
          
        </div>
      </div>
      
    </div>
    
  );
}

export default App;
