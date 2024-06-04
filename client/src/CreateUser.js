import React, { useState } from 'react';
import axios from 'axios';
import SurahSelection from './SurahSelection';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [rakahs, setRakahs] = useState(10);
  const [memorizationBank, setMemorizationBank] = useState([]);
  const [reviewBank, setReviewBank] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, rakahs, memorizationBank, reviewBank };
    await axios.post('/createUser', user);
    alert('User created!');
  };

  const addToMemorizationBank = (section) => {
    setMemorizationBank([...memorizationBank, section]);
  };

  const addToReviewBank = (section) => {
    setReviewBank([...reviewBank, section]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>Rakahs: <input type="number" value={rakahs} onChange={(e) => setRakahs(e.target.value)} /></label>
        <button type="submit">Create User</button>
      </form>
      <h2>Memorization Bank</h2>
      <SurahSelection addToBank={addToMemorizationBank} />
      <ul>
        {memorizationBank.map((section, index) => (
          <li key={index}>{section.surah} (Verses {section.startVerse}-{section.endVerse})</li>
        ))}
      </ul>
      <h2>Review Bank</h2>
      <SurahSelection addToBank={addToReviewBank} />
      <ul>
        {reviewBank.map((section, index) => (
          <li key={index}>{section.surah} (Verses {section.startVerse}-{section.endVerse})</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateUser;
