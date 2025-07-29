

interface PlayerColor{
    [key:string]: string;
}
const playerColor:PlayerColor = {
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
    const bottomBorderCondition = {
        'true':playerColor[weapon],
        'false':'white'
    }
    return ( 
        <div className="flex flex-col items-center">
            <span>{count}</span>
            <div className={`border-b-8 border-${bottomBorderCondition[`${currentPlayer===weapon}`]}-500`}>
                <span className={`text-${playerColor[`${weapon}`]}-500 text-2xl`}>{weapon}</span>
                <span>{playerName}</span>
            </div>
        </div>
    );
}
export default GameTurn;