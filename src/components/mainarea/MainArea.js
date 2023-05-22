import React from 'react';
import AssistantSelector from './assistantselector/AssistantSelector';
import ChatLayout from './chatlayout/ChatLayout';
import './MainArea.css';

function MainArea() {
  return (
    <section className="main-section">
      <AssistantSelector />
      <ChatLayout />
    </section>
  );
}

export default MainArea;