import { Button } from '@mui/material';

const SolutionButton = () => {
  
  const soln = [ // currently hardcoded, would need to load in somehow (FIXME - db eventually)
    1, 1, 1, 1, 1,
    1, 0, 1, 1, 1,
    0, 0, 1, 1, 0,
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0
  ]
  const grid = [ // FIXME - need to load in from grid
    1, 1, 1, 1, 1,
    1, 0, 1, 1, 1,
    0, 0, 1, 1, 0,
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0
  ]

  function checkSolution() { // FIXME - needs to get grid
    console.log("HERE")
    let correct = true
    for(var j = 0; j < soln.length; j++) {
      if(
        (soln[j] === 1 && grid[j] !== 1) || 
        (soln[j] === 0 && grid[j] === 1)
      ) {
        correct = false
      }
    }
    alert(correct ? "Solution is correct!" : "Solution is not correct...")
  }

  const solnDim = 5 // FIXME - generate from solution array?
  function genNums(isRow) {
    let fullList = []
    for (let i = 0; i < solnDim; i++) {
      let currList = []
      let blockSize = 0
      let isBlock = false
      for (let j = 0; j < solnDim; j++) {
        let cellNum = isRow ? i*solnDim+j : j*solnDim+i // Currently works with 1D array
        if (soln[cellNum] === 1) {
          isBlock = true
          blockSize++
        }
        else if (isBlock) {
          currList.push(blockSize)
          blockSize = 0
          isBlock = false
        }
      }
      if (blockSize != 0) {
        currList.push(blockSize)
      }
      if (currList.length === 0) {
        currList.push(0)
      }
      fullList.push(currList)
    }
    console.log(fullList) // FIXME - need to display next to grid
  }

  return (
    <div className="solnButton" key="0">
      <Button
        onClick={() => checkSolution()}
        variant = "contained"
      >
      Check Solution
      </Button>
    </div>
  );
}

export default SolutionButton;
