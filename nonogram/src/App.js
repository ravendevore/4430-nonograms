import './App.css';
import React from 'react';
import NonogramGame from './components/NonogramGame';
import CreatePuzzle from './components/CreatePuzzle';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <ul className="navbar">
        <li className="navItem">
          <Link style={{textDecoration: "none"}} to="/">Solve a Random Puzzle</Link>
        </li>
        <li className="navItem">
          <Link style={{textDecoration: "none"}} to="/create">Create Your Own</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NonogramGame />}/>
        <Route path="/create" element={<CreatePuzzle />}/>
      </Routes>
    </div>
  );
}

export default App;