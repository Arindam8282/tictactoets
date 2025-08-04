import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "utility/gameApi";

interface Props{
 
}
const CreateGame = ({}: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
    createGame().then(game => {
        navigate(`/game/${game.id}?player=o`);
    });
  }, []);
    return ( 
        <div>
            Creating game ...
        </div>
    );
}
export default CreateGame;