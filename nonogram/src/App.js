import './App.css';
import React from 'react';
import NonogramGame from './components/NonogramGame';
import SolutionButton from './components/Solution';

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

  // FIXME - need solution component
  const soln = [ // currently hardcoded, would need to load in somehow (FIXME - db eventually)
    "clickedShow", "clickedShow", "clickedShow", "clickedShow", "clickedShow",
    "clickedShow", "",            "clickedShow", "clickedShow", "clickedShow",
    "",            "",            "clickedShow", "clickedShow", "",
    "clickedShow", "",            "clickedShow", "",            "clickedShow",
    "",            "",            "",            "",            ""
  ]
  const solnDim = 5

  const genNums = (isRow) => { // Generates number for rows or cols based on input
    let fullList = [] // List of lists, each of which has the numbers for one row/col
    for (let i = 0; i < solnDim; i++) {
      let currList = []    // Stores list for current row/col
      let blockSize = 0    // Size of the block - determines what number appended to list
      let isBlock = false  // Size of blank spaces doesn't go in list - this keeps track of when to append
      for (let j = 0; j < solnDim; j++) {      // Iterate through row/col
        let cellNum = isRow ? i*5+j : j*5+i    // Determine which way to iterate through cells (rows or cols) - FIXME change to 2D array?
        if (soln[cellNum] === "clickedShow") { // If part of block
          isBlock = true
          blockSize++
        }
        else if (isBlock) { // Space after a block - blockSize is now the size of the full block
          currList.push(blockSize)
          blockSize = 0
          isBlock = false
        }
      }
      if (blockSize != 0) { // No spaces after the final block - append its size
        currList.push(blockSize)
      }
      if (currList.length === 0) { // If list empty, append 0 (no blocks)
        currList.push(0)
      }
      fullList.push(currList)
    }
    console.log(fullList) // FIXME - need to display next to grid
  }

  const checkGrid = () => {
      const grid = [...squares]
      let correct = true
      for(var j = 0; j < squares.length; j++) {
        if(
          (soln[j] === "clickedShow" && grid[j].state !== "clickedShow") || 
          (soln[j] !== "clickedShow" && grid[j].state === "clickedShow")
        ) {
          correct = false
        }
      }
      console.log(correct) // FIXME - need some response to this value
  }
  // FIXME - need solution component

  return (
    <div className="App">
      <NonogramGame></NonogramGame>
      <SolutionButton></SolutionButton>
    </div>
  );
}

export default App;
