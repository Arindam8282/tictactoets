import GameScreen from "components/Game/GameScreen/GameScreen";
import { GameProvider } from "contexts/GameContext";
import * as React from "react";

type Props = {};
const PVP = ({}: Props) => {
  return (
    <React.Fragment>
      <GameProvider gameType="pvp">
        <GameScreen />
      </GameProvider>
    </React.Fragment>
  );
};
export default PVP;
