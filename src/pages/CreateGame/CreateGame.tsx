import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "utility/gameApi";
import { socket } from "utility/socket";

interface Props{
 
}
const CreateGame = ({}: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.emit("findGame",{});
        socket.on("gameFound",({game})=>{
            navigate(`/game/${game.id}?player=${game.currentPlayer}`);
        });
    }, []);
    return ( 
        <div>
            Creating game ...
        </div>
    );
}
export default CreateGame;