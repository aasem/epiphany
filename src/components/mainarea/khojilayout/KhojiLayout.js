import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KhojiLayout.css';

function KhojiLayout({ state, setState }) {
  const [userInput, setUserInput] = useState(state.userInput || '');
  const [narratives, setNarratives] = useState(state.narratives || '');
  const [potentialCounterNarratives, setPotentialCounterNarratives] = useState(state.potentialCounterNarratives || '');

  useEffect(() => {
    setState({ userInput, narratives, potentialCounterNarratives });
  }, [userInput, narratives, potentialCounterNarratives, setState]);

  const handleAnalyzeText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/khoji', { userInput });
      const outputText = response.data; // This should contain the full output text
  
      // Split the output text into two parts
      const outputParts = outputText.split('Potential Counter Narratives:');
  
      // The first part is the narratives - remove the 'Narratives:' label from the start
      const narratives = outputParts[0].replace('Narratives:', '').trim();
  
      // The second part is the potential counter-narratives
      const potentialCounterNarratives = outputParts.length > 1 ? outputParts[1].trim() : '';
  
      setNarratives(narratives);
      setPotentialCounterNarratives(potentialCounterNarratives);
    } catch (error) {
      console.error('Failed to analyze text', error);
    }
  };
  

  return (
    <div className="khoji-container">
      <div className="khoji-input-container">
        <textarea
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          className="input-text"
          placeholder="Enter the input text"
        />
        <button onClick={handleAnalyzeText} className="analyze-btn">Extract Narratives</button>
      </div>
      <div className="khoji-output-container">
        <label className="output-label">Narratives</label>
        <textarea value={narratives} readOnly className="output-text" />
        <label className="output-label">Potential Counter-Narratives</label>
        <textarea value={potentialCounterNarratives} readOnly className="output-text" />
      </div>
    </div>
  );
}

export default KhojiLayout;
