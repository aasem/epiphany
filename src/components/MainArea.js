import React from 'react';
import AssistantSelector from './AssistantSelector';
import ChatLayout from './ChatLayout';
import '../styles/MainArea.css';

function MainArea() {
  return (
    <section className="main-section">
      <AssistantSelector />
      <ChatLayout />
    </section>
  );
}

export default MainArea;