import { useEffect, useState } from "react";

interface GameOverScreenProps {
  message: string;
}
const GameOverScreen = ({ message }: GameOverScreenProps) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer > 0) {
      let timeinterval = setInterval(() => {
        setTimer(timer - 1);
        clearInterval(timeinterval);
      }, 1000);
    }
  }, [timer]);

  return (
    <div className="flex justify-center flex-col items-center w-full h-full bg-gray-500/50 text-white text-2xl square">
      <p>{message}</p>
      <p> replaying game in {timer}</p>
    </div>
  );
};

export default GameOverScreen;
