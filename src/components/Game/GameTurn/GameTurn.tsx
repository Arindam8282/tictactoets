import { useGame } from "contexts/GameContext";


export interface PlayerColor{
    [key:string]: string;
}
export const playerColor:PlayerColor = {
    o:'blue',
    x:'red',
}
interface Props{
    count: number;
    playerName: string;
    weapon: string;
    currentPlayer: string;
}
const GameTurn = ({count=0,playerName="Player",weapon,currentPlayer}: Props) => {   
    const {gameInfo,gameType} = useGame() 
    const bottomBorderCondition = {
        true:playerColor[weapon],
        false:'white'
    }
    const currentPlayerName = {
        true: <span>{gameInfo["me"].weapon===weapon?"You":playerName}</span>,
        false: <span>{playerName}</span>
    }
    const weaponLogic: any = {
        'true': weapon
    } 
    return ( 
        <div className="flex flex-col items-center">
            <span>{count}</span>
            <div className={`border-b-8 border-${bottomBorderCondition[`${currentPlayer===weapon}`]}-500`}>
                <span className={`text-${playerColor[`${weapon}`]}-500 text-2xl`}>{weaponLogic[`${weapon!=='t'}`]}</span>
                {currentPlayerName[`${gameType!=="pvp"}`]}
            </div>
        </div>
    );
}
export default GameTurn;