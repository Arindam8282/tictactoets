import * as React from "react";

interface Border {
  [key: string]: string;
}
interface Props {
  gameOverType: string;
}
const GameOverBorder = ({ gameOverType }: Props) => {
  const borders: Border = {
    TG: "",
    LD: "absolute top-0 left-0 w-[130%] h-[6px] bg-yellow-500 rotate-45 origin-top-left animate-growLeftDiagonal",
    RD: "absolute top-0 right-0 w-[141%] h-[6px] bg-yellow-500 -rotate-45 origin-right animate-growRightDiagnal",
    row1: "absolute bg-yellow-500 animate-grow transform top-[15%] left-0 w-full h-2",
    row2: "absolute bg-yellow-500 animate-grow transform top-[47.5%] left-0 w-full h-2",
    row3: "absolute bg-yellow-500 animate-grow transform top-[80%] left-0 w-full h-2",
    col1: "absolute top-0 left-[16.5%] w-2 h-full bg-yellow-500 animate-grow-vert",
    col2: "absolute bg-yellow-500 animate-grow-vert transform left-[48.5%] top-0 h-full w-2",
    col3: "absolute bg-yellow-500 animate-grow-vert transform left-[80%] top-0 h-full w-2",
  };
  return (
      <div className={borders[gameOverType]}></div>
  );
};
export default GameOverBorder;
