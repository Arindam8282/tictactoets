import * as React from "react";
import { Link } from "react-router-dom";
interface Props {
  title?: string;
  link?: string;
  color?: string;
  onClick?: () => void;
}
const MainMenuButton = ({
  title = "Click Me",
  link = "/",
  color = "green",
  onClick,
}: Props) => {
  let colorMap = new Map<string, string>();
  colorMap.set(
    "green",
    "from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-700"
  );
  colorMap.set(
    "red",
    "from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700"
  );
  colorMap.set(
    "blue",
    "from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700"
  );
  if (onClick)
    return (
      <div
        onClick={onClick}
        className={`text-center inline-block bg-gradient-to-r ${colorMap.get(
          color
        )} text-white font-semibold py-2 px-6 rounded-lg shadow-md  transition-all duration-300 cursor-pointer`}
      >
        {title}
      </div>
    );
  return (
    <React.Fragment>
      <Link
        to={link}
        className={`text-center inline-block bg-gradient-to-r ${colorMap.get(
          color
        )} text-white font-semibold py-2 px-6 rounded-lg shadow-md  transition-all duration-300`}
      >
        {title}
      </Link>
    </React.Fragment>
  );
};
export default MainMenuButton;
