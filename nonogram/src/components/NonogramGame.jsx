import { Button } from '@mui/material';

const NonogramGame = () => {
  // const [style, setStyle] = useState("contained");
  const grid = Array(25).fill({sty: "outlined", val: 0});

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
      <Button sx={{margin: "3px", height: 60}} onClick={(e) => change(e, objElement)} variant={objElement.sty} />
    );
  });

  return (
    <div>
      {buttonMap}
    </div>
  );
}

export default NonogramGame;
