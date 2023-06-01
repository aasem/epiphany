import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KhojiLayout.css';

function KhojiLayout({ state, setState }) {
  const [campaignObjectives, setCampaignObjectives] = useState(state.campaignObjectives || '');
  const [userInput, setUserInput] = useState(state.userInput || '');
  const [narratives, setNarratives] = useState(state.narratives || '');

  useEffect(() => {
    setState({ campaignObjectives, userInput, narratives });
  }, [campaignObjectives, userInput, narratives, setState]);

  const handleAnalyzeText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/khoji', { userInput });
      const narratives = response.data; 
      setNarratives(narratives);
    } catch (error) {
      console.error('Failed to analyze text', error);
    }
  };

  return (
    <div className="khoji-container">
      <div className="khoji-input-container">
        <label className="input-label">Campaign Objectives</label>
        <textarea
          value={campaignObjectives}
          onChange={e => setCampaignObjectives(e.target.value)}
          className="input-text-campaign"
          placeholder="Enter the campaign objectives"
        />
        <label className="input-label">Input Data</label>
        <textarea
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          className="input-text-data"
          placeholder="Enter the input data (may be anything textual)"
        />
        <button onClick={handleAnalyzeText} className="analyze-btn">Extract Narratives</button>
      </div>
      <div className="khoji-output-container">
        <label className="output-label">Narratives and Lines of Pursuance</label>
        <textarea value={narratives} readOnly className="output-text" />
      </div>
    </div>
  );
}

export default KhojiLayout;
