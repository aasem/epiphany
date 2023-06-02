import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NaqqashLayout.css';

function NaqqashLayout({ state, setState, setCurrentAssistant }) {
  const [campaignObjectives, setCampaignObjectives] = useState(state.campaignObjectives || '');
  const [finalizedNarratives, setFinalizedNarratives] = useState(state.finalizedNarratives || '');
  const [messages, setMessages] = useState(state.messages || '');

  useEffect(() => {
    setState({ campaignObjectives, finalizedNarratives, messages });
  }, [campaignObjectives, finalizedNarratives, messages, setState]);

  const handleGenerateMessages = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/naqqash', { campaignObjectives, finalizedNarratives });
      const messages = response.data; 
      setMessages(messages);
    } catch (error) {
      console.error('Failed to generate messages', error);
    }
  };

  return (
    <div className="naqqash-container">
      <div className="naqqash-input-container">
        <label className="input-label">Campaign Objectives</label>
        <textarea
          value={campaignObjectives}
          onChange={e => setCampaignObjectives(e.target.value)}
          className="input-text-campaign"
          placeholder="Enter the campaign objectives"
        />
        <label className="input-label">Narratives and Lines of Pursuance</label>
        <textarea
          value={finalizedNarratives}
          onChange={e => setFinalizedNarratives(e.target.value)}
          className="input-text-narratives"
          placeholder="Enter the finalized narratives and lines of pusuance here"
        />
        <div className="buttons-container">
            <button onClick={() => setCurrentAssistant('your_audience_segmentation_module_endpoint')} className="segmentation-btn">Audience Segmentation</button>
            <button onClick={handleGenerateMessages} className="generate-btn">Generate Messages</button>
        </div>
      </div>
      <div className="naqqash-output-container">
        <label className="output-label">Generated Messages</label>
        <textarea value={messages} readOnly className="output-text" />
      </div>
    </div>
);
}

export default NaqqashLayout;
