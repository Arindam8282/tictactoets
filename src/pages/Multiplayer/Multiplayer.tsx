import GameScreen from 'components/Game/GameScreen/GameScreen';
import { GameProvider } from 'contexts/GameContext';
import React,{useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CellValue } from 'utility/gameFunctions';
import { socket } from 'utility/socket';

interface Props{
}
const Multiplayer = ({}: Props) => {
    const {gameId} = useParams();
    const [params] = useSearchParams();
    const player: CellValue = params.get('player') as CellValue;

    useEffect(()=>{
        socket.emit('joinGame', { gameId: gameId, player: player });
    },[gameId]);
    return ( 
        <React.Fragment>
            <GameProvider gameType='online' gameId={gameId} onlinePlayer={player}>
                <GameScreen />
            </GameProvider>
        </React.Fragment>
    );
}
export default Multiplayer;