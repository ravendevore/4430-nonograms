import { Button } from '@mui/material';

const NonogramGame = () => {
  // const [style, setStyle] = useState("contained");
  const grid = Array(25).fill({sty: "outlined", val: 0});

  function change(objElement) {
    console.log("Before: ", objElement);
    if (objElement.val === 0) {
      objElement.val = 1;
      objElement.sty = "outlined";
    } else if (objElement.val === 1) {
      objElement.val = 0;
      objElement.sty = "contained";
    }
    console.log("After: ", objElement);
  }

  function checkSty(objElement) {
    return objElement.sty;
  }

  const buttonMap = grid.map((objElement) => {
    console.log(objElement);
    return (
      <Button sx={{margin: "3px", height: 60}} onClick={() => change(objElement)} variant={objElement.sty}/>
    );
  });

  return (
    <div>
      {buttonMap}
    </div>
  );
}

export default NonogramGame;
