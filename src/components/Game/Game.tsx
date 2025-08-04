import React, { useEffect, useState } from "react";
import CircleShape from "./GameShapes/CircleShape";
import CrossShape from "./GameShapes/CrossShape";
import { useGame } from "contexts/GameContext";
import { CellValue, to2DArray } from "utility/gameFunctions";
import GameOverBorder from "./GameOverBorder/GameOverBorder";
import { socket } from "utility/socket";

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
interface GameProps {}
const Game = ({}: GameProps) => {
  const {
    gameType,
    gameId,
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    gameWinner,
    gameInfo,
    handleGameOver,
  } = useGame();

  const getShape: ElementMap = {
    o: <CircleShape />,
    x: <CrossShape />,
  };

  const makeMove = (newBoard: CellValue[][]) => {
    console.log("moveSend",newBoard,currentPlayer);
    socket.emit("makeMove", { gameId: gameId, newBoard, player:currentPlayer });
  };

  useEffect(() => {
    if (gameType === "online") {
      socket.on("moveMade", ({ newBoard, player }) => {
        console.log("moveReceived",newBoard,player);
        if(player!==gameInfo["me"].weapon) {
          handleGameOver(newBoard);
          setBoard([...newBoard]);
          setCurrentPlayer(player === "o" ? "x" : "o");
        }
      });

      socket.on("playerJoined", ({ player }) => {
        console.log(`${player} joined`);
      });

      return () => {
        socket.off("moveMade");
        socket.off("playerJoined");
      };
    }
  }, []);
  const fillCell = (index: number, shape: CellValue) => {
    if (
      currentPlayer !== gameInfo.me.weapon &&
      (gameType === "pvai" || gameType === "online")
    )
      return;
    let gameArray: CellValue[] = board.flat();
    if (!gameArray[index]) {
      gameArray[index] = shape;
      let newBoard: CellValue[][] = to2DArray(gameArray, 3);
      handleGameOver(newBoard);
      setCurrentPlayer(currentPlayer === "o" ? "x" : "o");
      setBoard([...newBoard]);
      if (gameType === "online") makeMove(newBoard);
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
        {gameWinner && gameWinner.type !== "TG" && (
          <GameOverBorder gameOverType={gameWinner.type} />
        )}
      </div>
    </React.Fragment>
  );
};
export default Game;
