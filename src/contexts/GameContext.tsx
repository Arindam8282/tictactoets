import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  bestPlayerVsComputer,
  CellValue,
  easyPlayerVsComputer,
  hardPlayerVsComputer,
  isBoardEmpty,
  isGameOver,
  UniformResult,
} from "utility/gameFunctions";

interface GameContextType {
  gameType: string;
  board: CellValue[][];
  setBoard: (board: CellValue[][]) => void;
  currentPlayer: CellValue;
  setCurrentPlayer: (player: CellValue) => void;
  gameWinner: UniformResult<CellValue> | false;
  setGameWinner: (winner: UniformResult<CellValue> | false) => void;
  gameInfo: GameInfo;
  setGameInfo: (info: GameInfo) => void;
  resetGame: () => void;
  resetScore: () => void;
  handleGameOver: (newBoard: CellValue[][]) => void;
  setAiPlayer: (player: string) => void;
  aiPlayer: string;
  gameId?: string;
}
interface Player {
  name: string;
  weapon: string;
  score: number;
}
interface GameInfo {
  [key: string]: Player;
}
const defaultBoard: CellValue[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const defaultGameInfo: GameInfo = {
  me: {
    name: "Player1",
    weapon: "o",
    score: 0,
  },
  o: {
    name: "Player1",
    weapon: "o",
    score: 0,
  },
  x: {
    name: "Player2",
    weapon: "x",
    score: 0,
  },
  t: {
    name: "TIE",
    weapon: "t",
    score: 0,
  },
};
export interface AiPlayerValue {
  value: string;
  name: string;
  method: Function;
}
export interface AiPlayer {
  [key: string]: AiPlayerValue;
}
export const aiPlayers: AiPlayer = {
  e: {
    value: "e",
    name: "Easy",
    method: easyPlayerVsComputer,
  },
  m: {
    value: "m",
    name: "Medium",
    method: hardPlayerVsComputer,
  },
  h: {
    value: "h",
    name: "Hard",
    method: bestPlayerVsComputer,
  },
};
type GameType = "pvp" | "pvai" | "online";
const GameContext = createContext<GameContextType | undefined>(undefined);
interface GameProviderProps {
  children: ReactNode;
  gameType: GameType;
  onlinePlayer?: CellValue;
  gameId?:string;
}
export const GameProvider = ({
  children,
  gameType,
  onlinePlayer,
  gameId
}: GameProviderProps) => {
  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);
  const [currentPlayer, setCurrentPlayer] = useState<CellValue>("o");
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultGameInfo);
  const [gameWinner, setGameWinner] = useState<
    UniformResult<CellValue> | false
  >(false);
  const [aiPlayer, setAiPlayer] = useState<string>("e");

  useEffect(() => {
    handleGameOperations();
  }, [board]);

  const handleGameOperations = async () => {
    if (gameType === "pvai") {
      if (gameInfo["me"].weapon !== currentPlayer && !gameWinner) {
        let newBoard = await aiPlayers[aiPlayer].method(board, currentPlayer);
        handleGameOver(newBoard);
        setBoard([...newBoard]);
        setCurrentPlayer(currentPlayer === "o" ? "x" : "o");
      }
    }
    if (gameType === "online") {
      gameInfo["me"] = gameInfo[onlinePlayer || "o"];
      setGameInfo({ ...gameInfo });
    }
  };

  const handleGameOver = (newBoard: CellValue[][]) => {
    const gameOverValue = isGameOver(newBoard);
    setGameWinner(gameOverValue);
    if (gameOverValue) {
      gameInfo[gameOverValue.value].score += 1;
      setGameInfo({ ...gameInfo });
      let gameTimeout = setTimeout(() => {
        resetGame();
        clearTimeout(gameTimeout);
      }, 5000);
    }
  };

  const resetGame = () => {
    setBoard(defaultBoard);
    setCurrentPlayer("o");
    setGameWinner(false);
  };
  const resetScore = () => {
    setGameInfo(defaultGameInfo);
  };

  return (
    <GameContext.Provider
      value={{
        gameType,
        gameId,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        aiPlayer,
        setAiPlayer,
        gameWinner,
        setGameWinner,
        resetGame,
        resetScore,
        gameInfo,
        setGameInfo,
        handleGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
