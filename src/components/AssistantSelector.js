import React, { useState } from 'react';
import '../styles/AssistantSelector.css';

const assistants = [
  "Strategico",
  "Khoji",
  "Naqqash",
  "Likhari",
  "Fankar",
  "Naqqad",
];

function AssistantSelector() {
  const [selectedAssistant, setSelectedAssistant] = useState("Strategico");

  const handleSelect = (assistant) => {
    setSelectedAssistant(assistant);
  }

  return (
    <div className="assistant-selector">
      <h6 className="assistant-label">Choose an Assistant</h6>
      <div className="switches-container">
        {assistants.map((assistant) => (
          <div key={assistant} className="switch-container">
            <label htmlFor={assistant}>{assistant}</label>
            <label className="switch">
              <input
                type="radio"
                id={assistant}
                name="assistant"
                checked={selectedAssistant === assistant}
                onChange={() => handleSelect(assistant)}
              />
              <span className="slider round" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssistantSelector;