import { AiPlayerValue } from "contexts/GameContext";

type Props = {
  players: AiPlayerValue[];
  setAiPlayer: (value:string) => void;
  aiPlayer: string;
};
export const AiPlayers = ({ players,aiPlayer,setAiPlayer }: Props) => {
  return (
    <select value={aiPlayer} onChange={(e)=>setAiPlayer(e.target.value)}>
      {players.map((player: AiPlayerValue, index: number) => (
        <option key={index} value={player.value}>
          {player.name}
        </option>
      ))}
    </select>
  );
};
export default AiPlayers;