import React, { useState } from 'react';
import axios from 'axios';

const GeneratePlan = () => {
  const [rakahs, setRakahs] = useState(10);
  const [memorizationBank, setMemorizationBank] = useState([]);
  const [reviewBank, setReviewBank] = useState([]);
  const [plan, setPlan] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const response = await axios.post('/generatePlan', { rakahs, memorizationBank, reviewBank });
    setPlan(response.data);
  };

  return (
    <div>
      <form onSubmit={handleGenerate}>
        <label>Rakahs: <input type="number" value={rakahs} onChange={(e) => setRakahs(e.target.value)} /></label>
        <button type="submit">Generate Plan</button>
      </form>
      <div>
        <h3>Prayer Plan:</h3>
        <ul>
          {plan.map((section, index) => (
            <li key={index}>{section.surah} (Verses {section.startVerse}-{section.endVerse})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneratePlan;
