import React, { useState } from "react";
import CircleShape from "./GameShapes/CircleShape";
import CrossShape from "./GameShapes/CrossShape";
import { useGame } from "contexts/GameContext";
import { CellValue, to2DArray } from "utility/gameFunctions";
import GameOverBorder from "./GameOverBorder/GameOverBorder";

const boxes: string[] = [
  " border-r-8 border-b-8 border-gray-400 ",
  " border-r-8 border-b-8  border-gray-400 ",
  " border-b-8 border-gray-400 ",
  " border-r-8 border-b-8 ",
  " border-r-8 border-b-8 ",
  " border-b-8 ",
  " border-r-8 ",
  " border-r-8 ",
  " flex ",
];
interface ElementMap {
  [key: string]: React.ReactElement;
}
interface GameProps {
}
const Game = ({}: GameProps) => {
  const { gameType,board, setBoard, currentPlayer, setCurrentPlayer, gameWinner,gameInfo, handleGameOver } = useGame();

  const getShape: ElementMap = {
    o: <CircleShape />,
    x: <CrossShape />,
  };
  

  const fillCell = (index: number, shape: CellValue) => {
    if(currentPlayer!==gameInfo.me.weapon && gameType==="pvai") return;
    let gameArray: CellValue[] = board.flat();
    if (!gameArray[index]) {
      gameArray[index] = shape;
      let newBoard:CellValue[][] = to2DArray(gameArray, 3)
      handleGameOver(newBoard);
      setCurrentPlayer(currentPlayer === "o" ? "x" : "o");
      setBoard([...newBoard]);
    }
  };


  return (
    <React.Fragment>
      <div className="grid grid-cols-3 grid-rows-3 w-72 h-72  relative">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`${box} border-gray-400 flex items-center justify-center cursor-pointer`}
            onClick={fillCell.bind(this, index, currentPlayer)}
          >
            {getShape[board.flat()[index]]}
          </div>
        ))}
        {(gameWinner && gameWinner.type!=='TG') && <GameOverBorder gameOverType={gameWinner.type} />}
      </div>
    </React.Fragment>
  );
};
export default Game;
