import { Button, Popover, Typography } from '@mui/material';
import React, {useState, useRef, useEffect} from 'react';
import example from "./example.png";



const NonogramGame = () => {
  
  var i = 0;

  const [usedData, setUsedData] = useState(false) //the data should only be loaded in once, after that, if they request a new puzzle, it should make a random one.
  const [dim] = useState(() => getDim())
  const [grid, setGrid] = useState(Array(dim*dim).fill({sty: "outlined", val: 0}).map((obj) => ({...obj, key: i++})))
  
  const [soln, setSoln] = useState(() => dataToGrid())
  const [colH, setcolH] = useState(genNums(0,false).map((obj) => ({val: obj, key: i++})))
  const [rowH, setrowH] = useState(genNums(1,false).map((obj) => ({val: obj, key: i++})))

  const [choiceStatus, setChoiceStatus] = useState(0)

  const timerId = useRef();
  const [seconds, setSeconds] = useState(0);
  const [gameNo, setGameNo] = useState(1);
  const [winNo, setWinNo] = useState(0);
  const [bestTime, setBestTime] = useState(1000);

  // keeps track of grid state by cols/rows
  let gridCols = genNums(0, true)
  let gridRows = genNums(1, true)

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

  function dataToGrid() {
    const urlParams = new URLSearchParams(window.location.search) //url input
    if(urlParams.has('data') === true && usedData === false) { //if url data exists
      setUsedData(true)
      let data = urlParams.get('data') //get it
      const hexList = []
      for(let i = 0; i < data.length; i += 4) { //divide into 4 length chunks, store in hexList
        hexList.push(data.substring(i, i + 4))
      }
      let fullPuzzleString = ""
      for(let i = 0; i < hexList.length; i++) { //for each 4 cars
        let binToAdd = parseInt(hexList[i], 16).toString(2) //convert from hex to binary
        let binarySize = 4 * hexList[i].length //binToAdd does not include leading 0s, and so we must readd them, as they are important data
        while(binToAdd.length < binarySize) {binToAdd = "0" + binToAdd} //expand binary to 16 digits, except in last line, where it should be < 16
        
        fullPuzzleString += binToAdd //add to full string
      }
      if(dim === 5 || dim === 15) { //in case dim = 5 or 15 remove first three digits
        fullPuzzleString = fullPuzzleString.substring(3)
      }

      var output = []
      for(let i = 0; i < fullPuzzleString.length; ++i)
        output.push(parseInt(fullPuzzleString[i])) //parse fullString into array of numbers
      return output
    }
    
    const chance = .75

    var output = Array(dim*dim);
    for(let i = 0; i < output.length; ++i) {
      let c = Math.random()
      if(c < chance) {
        output[i] = 1
      } else {
        output[i] = 0
      }
    }
      //this is actually called twice, as react calls usestate function twice. this function isn't pure, but it should work anyway
    return output
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
    if (objElement.val === gridCols[index]) { // grid matches - grey out
      return (
        <div className="textCol"
          key = {objElement.key}
          style={{color: "gray"}}
        >
          {objElement.val}
        </div>
      );
    } else {
      return (
        <div className="textCol"
          key = {objElement.key}
        >
          {objElement.val}
        </div>
      );
    }
  });
  
  const rowHMap = rowH.map((objElement, index) => {
    if (objElement.val === gridRows[index]) { // grid matches - grey out
      return (
        <div className="textRow"
          key = {objElement.key}
          style={{color: "gray"}}
        >
          {objElement.val}
        </div>
      );
    } else {
      return (
        <div className="textRow"
          key = {objElement.key}
        >
          {objElement.val}
        </div>
      );
    }
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
    if(correct){
      stopTimer();
      setWinNo(prev => prev + 1)
      if(seconds<bestTime){
        setBestTime(seconds);
      }
    }
  }

  function genNums(isRow, isGrid) {
    const solnDim = dim
    let fullList = []
    for (let i = 0; i < solnDim; i++) {
      let currList = []
      let blockSize = 0
      let isBlock = false
      for (let j = 0; j < solnDim; j++) {
        let cellNum = isRow ? i*solnDim+j : j*solnDim+i // Currently works with 1D array
        let currCellVal = isGrid ? grid[cellNum].val : soln[cellNum]
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
 

  function giveHint() {
    let hintToGive = determineHint()
    if (hintToGive) {
      let alertMsg = "Hint: The solution to " + hintToGive.type + " " + (hintToGive.index+1) + " will be revealed!"
      alert(alertMsg)
      for (let i = 0; i < dim; i++) { // change the cells to reveal the hint
        let cellIndex = hintToGive.type === "row" ? hintToGive.index*dim+i : i*dim+hintToGive.index
        if (soln[cellIndex] === 1) { // filled
          grid[cellIndex].val = 1;
          grid[cellIndex].sty = "contained";
          grid[cellIndex].color = "primary"; // blue for fill
          setGrid([...grid])
        } else { // blank - change to "X" for clarity
          grid[cellIndex].val = 2;
          grid[cellIndex].sty = "outlined";
          setGrid([...grid])
        }
      }
    } else { // no hints - user has solved puzzle
      alert("Hint: Try clicking the \"Check Solution\" button!") 
    }
  }

  function determineHint() { // first looks for a random empty row/col, then an unsolved row/col
    let emptyChoices = []
    gridCols.forEach( (currCol, currIndex) => { // find empty columns
      if (currCol === "0") {
        emptyChoices.push({type:"column", index:currIndex})
      }
    })
    gridRows.forEach( (currRow, currIndex) => { // find empty rows
      if (currRow === "0") {
        emptyChoices.push({type:"row", index:currIndex})
      }
    })
    if (emptyChoices.length) {// at least one empty row/col - return one at random
      return emptyChoices[Math.floor(Math.random() * emptyChoices.length)]
    }

    let unsolvedChoices = []
    for (let i = 0; i < dim; i++) {// find unsolved cols
      let correct = true
      for (let j = 0; j < dim; j++) {
        if( (soln[j*dim+i] === 1 && grid[j*dim+i].val !== 1) || (soln[j*dim+i] === 0 && grid[j*dim+i].val === 1) ) {
          correct = false
        }
      }
      if (!correct) {
        unsolvedChoices.push({type:"col", index:i})
      }
    }
    for (let i = 0; i < dim; i++) {// find unsolved rows
      let correct = true
      for (let j = 0; j < dim; j++) {
        if( (soln[i*dim+j] === 1 && grid[i*dim+j].val !== 1) || (soln[i*dim+j] === 0 && grid[i*dim+j].val === 1) ) {
          correct = false
        }
      }
      if (!correct) {
        unsolvedChoices.push({type:"row", index:i})
      }
    }
    if (unsolvedChoices.length) {// at least one unsolved row/col - return one at random
      return unsolvedChoices[Math.floor(Math.random() * unsolvedChoices.length)]
    } else {
      return // otherwise return nothing - no possible hints to give (solved)
    }
  }

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  }

  const resetTimer = () => {
    stopTimer();
    if(seconds) {
      setSeconds(0);
    }
  }

  function removeAll(){
    for(var j=0; j<soln.length; j++){
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

  useEffect(()=> {
          setcolH(genNums(0,false).map((obj) => ({val: obj, key: i++})));
          setrowH(genNums(1,false).map((obj) => ({val: obj, key: i++})));
  }, [soln]);

  
  function newGame(){
    if(window.confirm('Are you sure you want to start a new game?')){
      removeAll();
      resetTimer();
      startTimer();
      setSoln(() => dataToGrid());
      setGameNo(prev => prev + 1);
    }
  }

  const useEffectOnce = ( effect )=> {

    const destroyFunc = useRef();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);
  
    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }
  
    useEffect( ()=> {
  
        // only execute the effect first time around
        if (!effectCalled.current) { 
          destroyFunc.current = effect();
          effectCalled.current = true;
        }
  
        // this forces one render after the effect is run
        setVal(val => val + 1);
  
        return ()=> {
          // if the comp didn't render since the useEffect was called,
          // we know it's the dummy React cycle
          if (!renderAfterCalled.current) { return; }
          if (destroyFunc.current) { destroyFunc.current(); }
        };
    }, []);
  };
  useEffectOnce( ()=> {
    startTimer();
});


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

      <Button className="hint"
      variant="contained"
      onClick={() => giveHint()}
      >
        Get Hint
      </Button>

      <Button className="clearButton"
      variant='contained'
      onClick={() => clearBoard()}
      >
        Clear Board
      </Button>


  
      <Button className="newGameButton"
      variant='contained'
      onClick={() => newGame()}
      >
        New Game
      </Button>

      <p className="gameStats">Time: {seconds}
      <br></br>
      Games played: {gameNo}
      <br></br>
      Games won: {winNo}
      <br></br>
      win %: {(100*(winNo/gameNo)).toFixed(2)}
      <br></br>
      best time: {bestTime}</p>


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
          <img src={example} alt = "game instructions" />
          <Typography sx={{ p: 2 }}>-Left click to fill in squares</Typography>
        <Typography sx={{ p: 2 }}>-Right click to mark squares as blank</Typography>
      </Popover>
    </React.Fragment>
  );
}

export default NonogramGame;
