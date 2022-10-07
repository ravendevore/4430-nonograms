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

  function checkSolution() {
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

  return (
    <div className="solnButton" key="0">
      <Button
        onClick={checkSolution}
        variant = "contained"
      >
      Check Solution
      </Button>
    </div>
  );
}

export default SolutionButton;
