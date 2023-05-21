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
    <div className="dropdown assistant-selection">
      <h6 className="assistant-label">Choose an Assistant</h6>
      <button className="btn btn-danger dropdown-toggle" type="button" id="assistantDropdown">
        {selectedAssistant}
      </button>
      <div className="dropdown-menu" aria-labelledby="assistantDropdown">
        {assistants.map((assistant) => (
          <button 
            className="dropdown-item" 
            onClick={() => handleSelect(assistant)}
            key={assistant}
          >
            {assistant}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AssistantSelector;