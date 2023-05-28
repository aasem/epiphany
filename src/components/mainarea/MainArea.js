import React, { useState } from 'react';
import AssistantSelector from './assistantselector/AssistantSelector';
import ChatLayout from './chatlayout/ChatLayout';
import KhojiLayout from './khojilayout/KhojiLayout';  // Import KhojiLayout
import './MainArea.css';

// placeholder components for the other assistants
// ...You can remove KhojiComponent placeholder...

function MainArea() {
  const [selectedAssistant, setSelectedAssistant] = useState("Strategico");
  const [strategicoState, setStrategicoState] = useState({ chatLog: [] });
  const [khojiState, setKhojiState] = useState({ /* khoji-specific state */ });
  // ...states for other assistants...
  let assistantComponent;

  switch (selectedAssistant) {
    case "Strategico":
      assistantComponent = <ChatLayout state={strategicoState} setState={setStrategicoState} />;
      break;
    case "Khoji":
      assistantComponent = <KhojiLayout state={khojiState} setState={setKhojiState} />;  // Use KhojiLayout
      break;
    // ...cases for other assistants...
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
