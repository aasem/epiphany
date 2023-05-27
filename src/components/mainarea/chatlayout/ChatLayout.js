import axios from 'axios';
import React, { useState } from 'react';
import './ChatLayout.css';

function ChatLayout() {
  const [chatLog, setChatLog] = useState([]);

  const handleSendMessage = async (userMessage) => {
    setChatLog([...chatLog, { message: userMessage, fromUser: true }]);
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/strategico', 
        { message: userMessage },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const assistantMessage = response.data.message;
        setChatLog(prevChatLog => [...prevChatLog, { message: assistantMessage, fromUser: false }]);
      } else {
        setChatLog(prevChatLog => [...prevChatLog, { message: `Error ${response.status}: ${response.statusText}`, fromUser: false }]);
      }
    } catch (err) {
      console.error(err);
      setChatLog(prevChatLog => [...prevChatLog, { message: 'Error: Unable to connect to the assistant.', fromUser: false }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-log">
        {chatLog.map((messageData, index) => (
          <div key={index} className={`chat-message-container ${messageData.fromUser ? '' : 'from-gpt'}`}>
            <div className="avatar" />
            <div className="message">
              <p>{messageData.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <form
          className="message-form"
          onSubmit={(e) => {
            e.preventDefault();
            const message = e.target.elements.userText.value;
            e.target.elements.userText.value = '';
            handleSendMessage(message);
          }}
        >
          <div className="input-message-container">
            <textarea id="userText" rows="3" placeholder="Send a message." className="input-message" />
            <button id="submit" type="submit" className="send-btn">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatLayout;