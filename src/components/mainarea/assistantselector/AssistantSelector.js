import React from 'react';
import './AssistantSelector.css';

const assistants = [
  "Strategico",
  "Khoji"
];

function AssistantSelector({ selectedAssistant, setSelectedAssistant }) {

  const handleSelect = (assistant) => {
    setSelectedAssistant(assistant);
  }

  return (
    <div className="assistant-selector">
      <div className="switches-container">
        {assistants.map((assistant) => (
          <div key={assistant} className="switch-container">
            <label className="assistant-name" htmlFor={assistant}>{assistant}</label>
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
