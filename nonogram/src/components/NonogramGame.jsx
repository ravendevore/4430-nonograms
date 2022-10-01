import { Button } from '@mui/material';

import React, {useState} from 'react';

const NonogramGame = () => {
  var i = 0;
  const [grid, setGrid] = useState(Array(25).fill({sty: "outlined", val: 0}).map((obj) => ({...obj, key: i++})))
  const [colH, setColH] = useState(Array(5).fill({val: "12"}).map((obj) => ({...obj, key: i++})))
  const [rowH, setRowH] = useState(Array(5).fill({val: "21"}).map((obj) => ({...obj, key: i++})))
  //this is how we can set the original state outside of a function, by passing it to the useState function
  //also, .map gives each object a key, which is needed to give each button a unique key

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
      />
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

  return (
    <div className="grid">
      {[
      <div className="gridColH" key="0">
        {colHMap}
      </div>,
      <div className="gridRowH" key="1">
        {rowHMap}
      </div>,
      <div className="gridCont" key="2">
        {buttonMap}
      </div>
    ]}
    </div>
  );
}

export default NonogramGame;
