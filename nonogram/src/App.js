import './App.css';
import React from 'react';
import NonogramGame from './components/NonogramGame';
import CreatePuzzle from './components/CreatePuzzle'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NonogramGame />}/>
        <Route path="/create" element={<CreatePuzzle />}/>
      </Routes>
    </div>
  );
}

export default App;



// import './App.css';
// import React from 'react';
// import NonogramGame from './components/NonogramGame';

// function App() {

//   return (
//     <div className="App">
//       <NonogramGame></NonogramGame>
//     </div>
//   );
// }

// export default App;