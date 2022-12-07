import './App.css';
import './Theme.css'
import React, {useState} from 'react';
import NonogramGame from './components/NonogramGame';
import CreatePuzzle from './components/CreatePuzzle';
import RedirectElement from './components/RedirectElement';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function App() {

  const navigate = useNavigate()

  let startTheme = "darkMode"
  if (!localStorage)
  {
    localStorage.setItem("theme", "darkMode")
  }
  startTheme = localStorage.getItem("theme")
  const [theme, setTheme] = useState(startTheme)

  function redirectTo(destURL) { // without this the component won't reload
    navigate('/redirect')
    setTimeout( () => {navigate(destURL)},100)
  }

  function toggleTheme() {
    if (theme === "darkMode") { 
      setTheme("lightMode")
      localStorage.setItem("theme", "lightMode")
    }
    else { 
      setTheme("darkMode")
      localStorage.setItem("theme", "darkMode")
    }
  }

  return (
    <div className={`App ${theme}`}>
      <ul className="navbar">
        <li>
          <div className="dropdownSolve">
            <NavLink className={({isActive}) => isActive ? "navSolve navActive": "navSolve" } to="/">Solve a Random Puzzle</NavLink>
            <div className="dropdownSolveContent">
              <div className="solveLink" onClick={() => redirectTo("/?dim=5")}>5 x 5</div>
              <div className="solveLink" onClick={() => redirectTo("/?dim=10")}>10 x 10</div>
              <div className="solveLink" onClick={() => redirectTo("/?dim=15")}>15 x 15</div>
            </div>
          </div>
        </li>
        <li>
          <div className="dropdownCreate">
            <NavLink className={({isActive}) => isActive ? "navCreate navActive": "navCreate" } to="/create">Create Your Own</NavLink>
            <div className="dropdownCreateContent">
              <div className="solveLink" onClick={() => redirectTo("/create?dim=5")}>5 x 5</div>
              <div className="solveLink" onClick={() => redirectTo("/create?dim=10")}>10 x 10</div>
              <div className="solveLink" onClick={() => redirectTo("/create?dim=15")}>15 x 15</div>
            </div>
          </div>
        </li>
      </ul>
      <Button style={{position: "absolute"}} className="themeBtn" onClick={() => toggleTheme()} variant="contained">Toggle Theme</Button>
      <Routes>
        <Route path="/" element={<NonogramGame />}/>
        <Route path="/create" element={<CreatePuzzle />}/>
        <Route path="/redirect" element={<RedirectElement />}/>
      </Routes>
    </div>
  );
}

export default App;