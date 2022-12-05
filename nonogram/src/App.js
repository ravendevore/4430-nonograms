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
          <div className="dropdownSolve">
            <NavLink className={({isActive}) => isActive ? "navSolve navActive": "navSolve" } to="/">Solve a Random Puzzle</NavLink>
            <div className="dropdownSolveContent">
              <a href="/?dim=5" className="solveLink" >5 x 5</a>
              <a href="/?dim=10" className="solveLink" >10 x 10</a>
              <a href="/?dim=15" className="solveLink" >15 x 15</a>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdownCreate">
            <NavLink className={({isActive}) => isActive ? "navCreate navActive": "navCreate" } to="/create">Create Your Own</NavLink>
            <div className="dropdownCreateContent">
              <a href="/create?dim=5" className="solveLink" >5 x 5</a>
              <a href="/create?dim=10" className="solveLink" >10 x 10</a>
              <a href="/create?dim=15" className="solveLink" >15 x 15</a>
            </div>
          </div>
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