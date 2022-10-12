import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';

import React, {useState} from 'react';

const NonogramGame = () => {
  var i = 0;
  const [grid, setGrid] = useState(Array(25).fill({sty: "outlined", val: 0}).map((obj) => ({...obj, key: i++})))
  const soln = [
    1, 1, 1, 1, 1,
    1, 0, 1, 1, 1,
    0, 0, 1, 1, 0,
    1, 0, 1, 0, 1,
    0, 0, 0, 0, 0
  ]

  const [colH, setColH] = useState(genNums(0).map((obj) => ({val: obj, key: i++})))
  const [rowH, setRowH] = useState(genNums(1).map((obj) => ({val: obj, key: i++})))

  function arrToObj(array) {
    let output = []
    for(let j = 0; j < array.length; j++) {
        output[j] = {"val": array[j]}
    }
    console.log(output);
    return output;
  }

  function change(e, objElement) {
    console.log("Event: ", e);
    console.log("Before: ", objElement);
    if (objElement.val === 0) {
      objElement.val = 1;
      objElement.sty = "contained";
    } else if (objElement.val === 1) {
      objElement.val = 0;
      objElement.sty = "outlined";
    }
    console.log("After: ", objElement);
  }

  // onClick={() => change(objElement)}

  const buttonMap = grid.map((objElement) => {
    console.log(objElement.sty);
    return (
      <Button
        sx={{borderRadius: "0px", margin: "0px", border: "1px dotted white", height: "100%", width: "100%"}}
        key = {objElement.key}
        onClick={(e) => {change(e, objElement); setGrid([...grid])}}
        variant={objElement.sty}
      >
        <CloseIcon fontSize="large" sx={visuallyHidden} />
      </Button>
    );
  });

  const colHMap = colH.map((objElement) => {
    return (
      <div className="textCol"
        key = {objElement.key}
      >
        {objElement.val}
      </div>
    );
  });

  const rowHMap = rowH.map((objElement) => {
    return (
      <div className="textRow"
        key = {objElement.key}
      >
        {objElement.val}
      </div>
    );
  });

  function checkSolution() {
    let correct = true
    for(var j = 0; j < soln.length; j++) {
      if(
        (soln[j] === 1 && grid[j].val !== 1) || 
        (soln[j] === 0 && grid[j].val === 1)
      ) {
        correct = false
      }
    }
    alert(correct ? "Solution is correct!" : "Solution is not correct...") 
  }


  function genNums(isRow) {
    const solnDim = 5
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
    return fullList;
  }

  return (
    <React.Fragment className="game">
        <div className="grid">
            <div className="gridColH">
                {colHMap}
            </div>
            <div className="gridRowH">
                {rowHMap}
            </div>
            <div className="gridCont">
                {buttonMap}
            </div>
        </div>
        <Button className="solnButton"
            onClick={() => checkSolution()}
            variant = "contained"
        >
            Check Solution
        </Button>
    </React.Fragment>
    
  );
}

export default NonogramGame;
