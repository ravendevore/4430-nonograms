import './App.css';
import React from 'react';
import NonogramGame from './components/NonogramGame';
import CreatePuzzle from './components/CreatePuzzle';
import { Routes, Route, NavLink } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <ul className="navbar">
        <li>
          <NavLink className={({isActive}) => isActive ? "navSolve navActive": "navSolve" } to="/">Solve a Random Puzzle</NavLink>
        </li>
        <li>
          <NavLink className={({isActive}) => isActive ? "navCreate navActive": "navCreate" } to="/create">Create Your Own</NavLink>
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