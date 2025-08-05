import { CellValue } from "utility/gameFunctions";
import { playerColor } from "./GameTurn";
import { GameInfo } from "contexts/GameContext";

interface Props {
    player: CellValue;
    gameInfo: GameInfo;
};
const Turn = ({player,gameInfo}: Props) => {
    const turnLogic = {
        true: "Your Turn",
        false: "Opponent's Turn"
    }
  return (
      <div className={`text-${playerColor[player]}-500 text-2xl font-bold`}>
        {turnLogic[`${gameInfo.me.weapon===player}`]}
      </div>
  );
};
export default Turn;
