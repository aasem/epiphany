import React, { useState } from 'react';
import './ChatLayout.css';

function ChatLayout() {
  const [chatLog, setChatLog] = useState([]); // Start with an empty chat log

  const handleSendMessage = (message) => {
    setChatLog([...chatLog, { message, fromUser: true }]); // Append the new message to the chat log
  };

  return (
    <div className="chat-container">
      {/* Display chat log */}
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

      {/* Send new message */}
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
            <button id="submit" type="button" className="send-btn">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatLayout;