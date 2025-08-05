import { GameInfo, GameType } from "contexts/GameContext";
import { useEffect, useState } from "react";
import { CellValue, UniformResult } from "utility/gameFunctions";

interface GameOverScreenProps {
  gameWinner: UniformResult<CellValue>;
  gameInfo: GameInfo;
  gameType: GameType;
}
const GameOverScreen = ({ gameWinner,gameInfo,gameType }: GameOverScreenProps) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer > 0) {
      let timeinterval = setInterval(() => {
        setTimer(timer - 1);
        clearInterval(timeinterval);
      }, 1000);
    }
  }, [timer]);
  const gameOverMessage:any = {
    'true-true-false': `${gameInfo[gameWinner.value].name} has won the match`,
    'true-false-false': `${gameInfo[gameWinner.value].name} has won the match`,
    'false-true-false': 'You won the match',
    'false-false-false': 'You lost the match',
    'false-false-true': 'TIE',
    'true-false-true': 'TIE'
  }
  return (
    <div className="flex justify-center flex-col items-center w-full h-full bg-gray-500/50 text-white text-2xl square">
      <p>{gameOverMessage[`${gameType==='pvp'}-${gameInfo.me.weapon===gameWinner.value}-${gameWinner.value==='t'}`]}</p>
      <p> replaying game in {timer}</p>
    </div>
  );
};

export default GameOverScreen;
