import { Button, Popover, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; //FIXME
import React, {useState} from 'react';
import example from "./example.png"


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

  function change(e, objElement) { // left click - toggle fill
    console.log("Event: ", e);
    console.log("Before: ", objElement);
    if (objElement.val === 0 || objElement.val === 2) { //b lank or X: change to filled
      objElement.val = 1;
      objElement.sty = "contained";
      objElement.color = "primary"; // blue for fill
    } else if (objElement.val === 1) { // filled: change to blank
      objElement.val = 0;
      objElement.sty = "outlined";
    }
    console.log("After: ", objElement);
  }

  function changeRight(e, objElement) { // right click - toggle X
    e.preventDefault() // prevent context menu from showing
    console.log("Event: ", e);
    console.log("Before: ", objElement);
    if (objElement.val === 0 || objElement.val === 1) { // currently blank or filled: change to X
      objElement.val = 2;
      objElement.sty = "contained";
      objElement.color = "error"; // red for X
    } else if (objElement.val === 2) { // currently X: change to blank
      objElement.val = 0;
      objElement.sty = "outlined";
    }
    console.log("After: ", objElement);
  }

  const buttonMap = grid.map((objElement) => {
    console.log(objElement.sty);
    if (objElement.val == 2) // display X
    {
      return (
        <Button
          sx={{borderRadius: "0px", margin: "0px", border: "1px dotted white", height: "100%", width: "100%"}}
          key = {objElement.key}
          onClick={(e) => {change(e, objElement); setGrid([...grid])}}
          onContextMenu={(e) => {changeRight(e, objElement); setGrid([...grid])}}
          variant={objElement.sty}
          color={objElement.color}
        >
          <CloseIcon color="white" sx={{ width: 30, height: 30 }}/>
        </Button>
      );
    }
    else // do not display X
    {
      return (
        <Button
          sx={{borderRadius: "0px", margin: "0px", border: "1px dotted white", height: "100%", width: "100%"}}
          key = {objElement.key}
          onClick={(e) => {change(e, objElement); setGrid([...grid])}}
          onContextMenu={(e) => {changeRight(e, objElement); setGrid([...grid])}}
          variant={objElement.sty}
          color={objElement.color}
        >
        </Button>
      );
    }
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


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
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


      <Button className="tutorial"
      variant="contained"
      onClick={handleClick}
      >
        How to Play
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 300 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          -Numbers on the side of each row and column correspond to “blocks” of squares than should be filled in
        </Typography>
          <img src={example} />
          <Typography sx={{ p: 2 }}>-Left click to fill in squares</Typography>
        <Typography sx={{ p: 2 }}>-Right click to mark squares as blank</Typography>
      </Popover>
    </React.Fragment>
    
  );
}

export default NonogramGame;
