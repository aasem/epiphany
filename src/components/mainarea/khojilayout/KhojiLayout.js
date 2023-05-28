import React, { useEffect, useState } from 'react';
import './KhojiLayout.css';

function KhojiLayout({ state, setState }) {
  const [userInput, setUserInput] = useState(state.userInput || '');
  const [narratives, setNarratives] = useState(state.narratives || '');
  const [potentialCounterNarratives, setPotentialCounterNarratives] = useState(state.potentialCounterNarratives || '');

  useEffect(() => {
    setState({ userInput, narratives, potentialCounterNarratives });
  }, [userInput, narratives, potentialCounterNarratives, setState]);

  const handleAnalyzeText = async () => {
    // Send the user's input to your backend, and get the narratives and potential counter-narratives
    // For now, I'm just setting some placeholder text
    setNarratives('Narratives go here');
    setPotentialCounterNarratives('Potential counter-narratives go here');
  };

  return (
    <div className="khoji-container">
      <div className="khoji-input-container">
        <textarea
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          className="input-text"
          placeholder="Enter text here"
        />
        <button onClick={handleAnalyzeText} className="analyze-btn">Analyze</button>
      </div>
      <div className="khoji-output-container">
        <textarea value={narratives} readOnly className="output-text" />
        <textarea value={potentialCounterNarratives} readOnly className="output-text" />
      </div>
    </div>
  );
}

export default KhojiLayout;
