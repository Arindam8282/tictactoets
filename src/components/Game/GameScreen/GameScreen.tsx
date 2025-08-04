import GameTurn from "components/Game/GameTurn/GameTurn";
import MainMenuButton from "components/Buttons/MainMenuButton/MainMenuButton";
import * as React from "react";
import Game from "../Game";
import { aiPlayers, useGame } from "contexts/GameContext";
import GameOverScreen from "../GameOverScreen/GameOverScreen";
import AiPlayers from "components/AiPlayers/AiPlayers";

interface AiModeSelection {
  [key: string]: React.ReactElement;
}
interface GameScreenProps {}
const GameScreen = ({}: GameScreenProps) => {
  const {
    gameWinner,
    gameInfo,
    currentPlayer,
    gameType,
    setAiPlayer,
    aiPlayer,
  } = useGame();
  const aiSelection: AiModeSelection = {
    pvai: (
      <AiPlayers
        players={Object.values(aiPlayers)}
        aiPlayer={aiPlayer}
        setAiPlayer={setAiPlayer}
      />
    ),
  };
  return (
    <React.Fragment>
      <div className="flex flex-col h-full justify-between">
        <div className="flex w-full justify-between">
          <MainMenuButton title="Main Menu" link="/" />
          {aiSelection[gameType]}
          <MainMenuButton title="Reset Score" color="red" link="/" />
        </div>
        <div className="flex w-full justify-center">
          <Game />
        </div>
        <div className="flex w-full justify-around">
          <GameTurn
            currentPlayer={currentPlayer}
            playerName={gameInfo["o"].name}
            count={gameInfo["o"].score}
            weapon="o"
          />
          <GameTurn
            currentPlayer={currentPlayer}
            playerName={gameInfo["t"].name}
            count={gameInfo["t"].score}
            weapon="t"
          />
          <GameTurn
            currentPlayer={currentPlayer}
            playerName={gameInfo["x"].name}
            count={gameInfo["x"].score}
            weapon="x"
          />
        </div>
        
      </div>
      <div className="mt-[-84%] flex w-full h-[101%]">
        {gameWinner && (
          <GameOverScreen message={`${gameWinner.value} has won the match`} />
        )}
      </div>
    </React.Fragment>
  );
};
export default GameScreen;
