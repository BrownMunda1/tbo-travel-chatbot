import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import Basic from './components/Basic';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/chat', { message: userMessage });
      setBotResponse(response.data.message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='app'>
      {/* <h1>Simple Chatbot</h1>
      <div>
        <div>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <div>
          <p>User: {userMessage}</p>
          <p>Bot: {botResponse}</p>
        </div>
      </div> */}
      <Basic/>
    </div>
  );
}

export default App;
