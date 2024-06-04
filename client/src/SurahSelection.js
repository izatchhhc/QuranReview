import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurahSelection = ({ addToBank }) => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [startVerse, setStartVerse] = useState(1);
  const [endVerse, setEndVerse] = useState(1);

  useEffect(() => {
    const fetchSurahs = async () => {
      const response = await axios.get('/surahs');
      setSurahs(response.data);
    };
    fetchSurahs();
  }, []);

  const handleSurahChange = (e) => {
    const surah = surahs.find(s => s.number === parseInt(e.target.value));
    setSelectedSurah(surah);
    setStartVerse(1);
    setEndVerse(surah.verses);
  };

  const handleAddToBank = () => {
    addToBank({
      surah: selectedSurah.name,
      startVerse,
      endVerse
    });
  };

  return (
    <div>
      <label>
        Surah:
        <select onChange={handleSurahChange}>
          <option value="">Select Surah</option>
          {surahs.map(surah => (
            <option key={surah.number} value={surah.number}>{surah.name}</option>
          ))}
        </select>
      </label>
      {selectedSurah && (
        <>
          <label>
            Start Verse:
            <input type="number" value={startVerse} onChange={(e) => setStartVerse(parseInt(e.target.value))} min="1" max={selectedSurah.verses} />
          </label>
          <label>
            End Verse:
            <input type="number" value={endVerse} onChange={(e) => setEndVerse(parseInt(e.target.value))} min="1" max={selectedSurah.verses} />
          </label>
          <button onClick={handleAddToBank}>Add to Bank</button>
        </>
      )}
    </div>
  );
};

export default SurahSelection;
