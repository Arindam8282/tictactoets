import React, { useEffect, useState } from "react";
import CircleShape from "./GameShapes/CircleShape";
import CrossShape from "./GameShapes/CrossShape";
import { useGame } from "contexts/GameContext";
import { CellValue, to2DArray } from "utility/gameFunctions";
import GameOverBorder from "./GameOverBorder/GameOverBorder";
import { socket } from "utility/socket";
import Turn from "./GameTurn/Turn";
import { FindingMatch } from "./FindingMatch/FindingMatch";

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
interface RoomInfo {
  totalPlayersCount: number;
  numberOfClients: number;
}
const defaultRoom: RoomInfo = {
  totalPlayersCount: 0,
  numberOfClients: 2,
};
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
    resetGame,
    resetScore
  } = useGame();
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(defaultRoom);
  const getShape: ElementMap = {
    o: <CircleShape />,
    x: <CrossShape />,
  };

  const makeMove = (newBoard: CellValue[][]) => {
    socket.emit("makeMove", {
      gameId: gameId,
      newBoard,
      player: currentPlayer,
    });
  };

  useEffect(() => {
    console.log("new game begin");
    
    resetScore();
    resetGame();
    if (gameType === "online") {
      socket.on("moveMade", ({ newBoard, player }) => {
        handleGameOver(newBoard);
        setBoard([...newBoard]);
        setCurrentPlayer(player === "o" ? "x" : "o");
      });

      socket.on(
        "playerJoined",
        ({ player, numberOfClients, totalPlayersCount }) => {
          console.log(`${player} joined`, numberOfClients, totalPlayersCount);
          setRoomInfo({ numberOfClients, totalPlayersCount });
        }
      );
      socket.on(
        "playerLeft",
        ({ socketId, numberOfClients }) => {
          console.log(`${socketId} left`, numberOfClients);
          setRoomInfo({ ...roomInfo,numberOfClients });
        }
      );
      return () => {
        socket.off("moveMade");
        socket.off("playerJoined");
        socket.emit('leaveGame', { gameId, player:gameInfo.me.weapon });
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
  const GameBoxes = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };
  const gameRenderLogic: any = {
    "true-false": <FindingMatch />,
    "false-false": <GameBoxes />,
    "true-true": <GameBoxes />,
  };
  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
      {roomInfo.numberOfClients === roomInfo.totalPlayersCount && <Turn player={currentPlayer} gameInfo={gameInfo} />}
      <div className="grid grid-cols-3 grid-rows-3 w-72 h-72  relative">
        {
          gameRenderLogic[
            `${gameType === "online"}-${
              roomInfo.numberOfClients === roomInfo.totalPlayersCount
            }`
          ]
        }
      </div>
      </div>
    </React.Fragment>
  );
};
export default Game;
