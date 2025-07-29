import GameScreen from "components/Game/GameScreen/GameScreen";
import { GameProvider } from "contexts/GameContext";
import * as React from "react";

interface Props {}
const PVAI = ({}: Props) => {
  return (
    <React.Fragment>
      <GameProvider gameType="pvai">
        <GameScreen />
      </GameProvider>
    </React.Fragment>
  );
};
export default PVAI;
