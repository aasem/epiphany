import React, { useState } from 'react';
import AssistantSelector from './assistantselector/AssistantSelector';
import ChatLayout from './chatlayout/ChatLayout';
import KhojiLayout from './khojilayout/KhojiLayout';
import NaqqashLayout from './naqqashlayout/NaqqashLayout';  // Import NaqqashLayout
import './MainArea.css';

function MainArea() {
  const [selectedAssistant, setSelectedAssistant] = useState("Strategico");
  const [strategicoState, setStrategicoState] = useState({ chatLog: [] });
  const [khojiState, setKhojiState] = useState({ userInput: '', narratives: '', campaignObjectives: '' });
  const [naqqashState, setNaqqashState] = useState({ campaignObjectives: '', narratives: '', messages: '' });
  let assistantComponent;

  switch (selectedAssistant) {
    case "Strategico":
      assistantComponent = <ChatLayout state={strategicoState} setState={setStrategicoState} />;
      break;
    case "Khoji":
      assistantComponent = <KhojiLayout state={khojiState} setState={setKhojiState} />;
      break;
    case "Naqqash":
      assistantComponent = <NaqqashLayout state={naqqashState} setState={setNaqqashState} />;
      break;
    default:
      // Optional: handle default case
      break;
  }

  return (
    <section className="main-section">
      <AssistantSelector selectedAssistant={selectedAssistant} setSelectedAssistant={setSelectedAssistant} />
      {assistantComponent}
    </section>
  );
}

export default MainArea;
