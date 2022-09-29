import { Button } from '@mui/material';

import React, {useState} from 'react';

const NonogramGame = () => {
  var i = 0;
  const [grid, setGrid] = useState(Array(25).fill({sty: "outlined", val: 0}).map((obj) => ({...obj, key: i++})))
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
        sx={{margin: "3px", height: 60}}
        key = {objElement.key}
        onClick={(e) => {change(e, objElement); setGrid([...grid])}}
        variant={objElement.sty}
      />
    );
  });

  return (
    <div>
      {buttonMap}
    </div>
  );
}

export default NonogramGame;
