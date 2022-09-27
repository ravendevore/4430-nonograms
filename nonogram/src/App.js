import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [squares, setSquares] = useState([])

  const createGrid = () => {
    var i = 0
    const grid = Array(25).fill({"state" : ""}) 
      .map((square) => ({...square, id: i++}))
    setSquares(grid)
    console.log(squares)
  }

  const changeGrid = (id, state) => {
    const grid = [...squares]
    for(var j = 0; j < squares.length; j++) {
      if(grid[j].id === id) {
        grid[j].state = state
        console.log(grid[j].id, grid[j].state)
        break;
      }
    }
    setSquares(grid)
  }

  return (
    <div className="App">
      <button className = "create" onClick = {createGrid}>CREATE!</button>
      
      <div className = "square-grid">
          {squares.map(square => (
            <div className = "square" key = {square.id}>
              <div className={square.state}>
                <img
                  className="default" src="/img/default.png" alt = "default square" draggable="false" 
                  onClick={(e) => {
                    changeGrid(square.id, "clickedShow")
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    changeGrid(square.id, "xShow")
                  }}
                />
                <img
                  className="clicked" src="/img/clicked.png" alt = "clicked square" draggable="false"
                  onClick={(e) => {
                    changeGrid(square.id, "")
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    changeGrid(square.id, "xShow")
                  }}
                />
                
                <img 
                  className="x" src="/img/x.png" alt = "x square" draggable="false"
                  onClick={(e) => {
                    changeGrid(square.id, "clickedShow")
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    changeGrid(square.id, "")
                  }}
                />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
