import React from 'react';
import CreateUser from './CreateUser';
import GeneratePlan from './GeneratePlan';
import SurahSelection from './SurahSelection';

const App = () => {
  return (
    <div>
      <h1>Quran Memorization App</h1>
      <SurahSelection />
      <CreateUser />
      <GeneratePlan />
    </div>
  );
};

export default App;
