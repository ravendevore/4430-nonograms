import { Button } from '@mui/material';

const NonogramGame = () => {
  // const [style, setStyle] = useState("contained");
  const grid = Array(25).fill({style: "contained", value: 0}).map((square) => ({...square, id: i++}));

  function changeStyle(element) {
    if (element.value === 0) {
      element.value = 1;
      element.style = "outlined";
    } else if (element.value === 1) {
      element.value = 0;
      element.style = "contained";
    }

    return element;
  }

  const buttonMap = grid.map((element) =>
      <Button sx={{margin: "5px"}} onClick={(e) => {changeStyle(element); console.log(element.style)}} variant={element.style}/>
  );

  return (
    <div>
      {buttonMap}
    </div>
  );
}

export default NonogramGame;
