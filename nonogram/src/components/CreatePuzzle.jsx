import { Button, Popover, Typography } from '@mui/material';
import React, {useState} from 'react';

const CreatePuzzle = () => {
  var i = 0;
  const [dim] = useState(() => getDim())
  const [grid, setGrid] = useState(Array(dim*dim).fill({sty: "outlined", val: 0}).map((obj) => ({...obj, key: i++})))

  const [colH] = useState(genNums(0).map((obj) => ({val: obj, key: i++})))
  const [rowH] = useState(genNums(1).map((obj) => ({val: obj, key: i++})))

  const [choiceStatus, setChoiceStatus] = useState(0)
  const [linkButtonText, setLinkButtonText] = useState("GET PUZZLE LINK");

  // keeps track of grid state by cols/rows
  let gridCols = genNums(0)
  let gridRows = genNums(1)

  function getDim() {
    const urlParams = new URLSearchParams(window.location.search)
    let d = urlParams.get('dim')

    const valid = ["5", "10", "15"]
    if(valid.includes(d) === false) {
      return 5
    } else {
      return parseInt(d)
    }
  }

  function changeFirst(e, objElement) {
    setChoiceStatus(objElement.val)
    if (e.buttons === 1) {
      if (objElement.val === 0 || objElement.val === 2) {
        objElement.val = 1
        objElement.sty = "contained"
        objElement.color = "primary"
      } else if (objElement.val === 1) {
        objElement.val = 0
        objElement.sty = "outlined"
      }
    } else if (e.buttons === 2) {
      if (objElement.val === 0 || objElement.val === 1) {
        objElement.val = 2
        objElement.sty = "outlined"
      } else if (objElement.val === 2) {
        objElement.val = 0
        objElement.sty = "outlined"
      }
    }
  }

  function change(e, objElement) { // set is what we set it do, and its based on the initial value
    if (e.buttons === 1) {
      if (choiceStatus === 0 || choiceStatus === 2) {
        objElement.val = 1
        objElement.sty = "contained"
        objElement.color = "primary"
      } else if (choiceStatus === 1) {
        objElement.val = 0
        objElement.sty = "outlined"
      }
    } else if (e.buttons === 2) {
      if (choiceStatus === 0 || choiceStatus === 1) {
        objElement.val = 2
        objElement.sty = "outlined"
      } else if (choiceStatus === 2) {
        objElement.val = 0
        objElement.sty = "outlined"
      }
    }
  }

  const buttonMap = grid.map((objElement) => {
    if (objElement.val === 2) {
      return (
        <Button
          sx={{borderRadius: "0px", margin: "0px", border: "1px solid var(--secondary-border)", height: "100%", width: "100%", padding: "0"}}
          key = {objElement.key}
          onMouseOver = {(e) => {change(e, objElement); setGrid([...grid])}}
          onMouseDown = {(e) => {changeFirst(e, objElement); setGrid([...grid])}}
          onContextMenu={(e) => {e.preventDefault()}}
          variant={objElement.sty}
          color={objElement.color}
        >X</Button>
      )
    }
    else {
      return (
        <Button
          sx={{borderRadius: "0px", margin: "0px", border: "1px solid var(--secondary-border)", height: "100%", width: "100%", padding: "0"}}
          key = {objElement.key}
          onMouseOver = {(e) => {change(e, objElement); setGrid([...grid])}}
          onMouseDown = {(e) => {changeFirst(e, objElement); setGrid([...grid])}}
          onContextMenu={(e) => {e.preventDefault()}}
          variant={objElement.sty}
          color={objElement.color}
        />
      )
    }
  });

  const colHMap = colH.map((objElement, index) => {
    return (
      <div className="textCol"
        key = {objElement.key}
      >
        {gridCols[index]}
      </div>
    );
  });
  
  const rowHMap = rowH.map((objElement, index) => {
    return (
      <div className="textRow"
        key = {objElement.key}
      >
        {gridRows[index]}
      </div>
    );
  });

  function createPuzzleLink() {
    let puzzleURL = "http://localhost:3000?dim=" + dim + "&data=" // base URL
    let puzzleData = ""
    for(var j = 0; j < grid.length; j++) { // get the binary data from the grid
      if (grid[j].val === 1) {
        puzzleData += "1"
      }
      else {
        puzzleData += "0"
      }
    }

    while (puzzleData.length % 4 !== 0) { // add leading 0s for better hex conversion
      puzzleData = "0" + puzzleData
    }

    for (let i = 0; i < puzzleData.length / 4; i++) { // convert binary to hex, 4 chars at a time
      let binarySubstr = puzzleData.substring(i*4,i*4+4)
      let hexSubstr = parseInt(binarySubstr, 2).toString(16)
      puzzleURL += hexSubstr
    }

    navigator.clipboard.writeText(puzzleURL) // copy URL to clipboard
    
    setLinkButtonText("COPIED!") // button indicates that link was copied
    setTimeout(() => {
      setLinkButtonText("GET PUZZLE LINK")
    }, 1000)
  }
 
  function genNums(isRow) {
    const solnDim = dim
    let fullList = []
    for (let i = 0; i < solnDim; i++) {
      let currList = []
      let blockSize = 0
      let isBlock = false
      for (let j = 0; j < solnDim; j++) {
        let cellNum = isRow ? i*solnDim+j : j*solnDim+i // Currently works with 1D array
        let currCellVal = grid[cellNum].val
        if (currCellVal === 1) {
          isBlock = true
          blockSize++
        }
        else if (isBlock) {
          currList.push(blockSize)
          blockSize = 0
          isBlock = false
        }
      }
      if (blockSize !== 0) {
        currList.push(blockSize)
      }
      if (currList.length === 0) {
        currList.push(0)
      }
      fullList.push(currList.join(' '))
    }
    return fullList
  }

  function removeAll(){
    for(var j=0; j<grid.length; j++){
      if(grid[j].val === 1 || grid[j].val ===2){
        grid[j].val = 0;
        grid[j].sty = 'outlined';
        setGrid([...grid])
      }
    }
  }

  function clearBoard() {
    if(window.confirm('Are you sure you want to clear the board?')){
      removeAll();
    }
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
      <div className={"size-" + dim}>
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
      </div>

      <Button className="puzzleLinkButton"
        onClick={() => createPuzzleLink()}
        variant = "contained"
      >
        {linkButtonText}
      </Button>
      
      <Button className="createTutorial"
      variant="contained"
      onClick={handleClick}
      >
        How It Works
      </Button>

      <Button className="clearCreateButton"
      variant='contained'
      onClick={() => clearBoard()}
      >
        Clear Board
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
        <Typography sx={{ p: 2 }}>-Left click to fill in squares</Typography>
        <Typography sx={{ p: 2 }}>-Right click to mark squares as blank</Typography>
        <Typography sx={{ p: 2 }}>
          -Numbers on the side of each row and column will automatically update to show the state of your puzzle
        </Typography>        
        <Typography sx={{ p: 2 }}>-When you're satisfied, click "Get Puzzle Link" to share your puzzle with others.</Typography>
      </Popover>
    </React.Fragment>
  );
}

export default CreatePuzzle;
