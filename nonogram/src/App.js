import './App.css';
import React from 'react';
import NonogramGame from './components/NonogramGame';
import SolutionButton from './components/Solution';

function App() {

  return (
    <div className="App">
      <NonogramGame></NonogramGame>
      <SolutionButton></SolutionButton>
    </div>
  );
}

export default App;