import React from "react";
import MainMenuImage from "assets/main-menu.png";
import MainMenuButton from "components/Buttons/MainMenuButton/MainMenuButton";

const Menus = [
  { title: "Player vs Player", link: "game" },
  {
    title: "Player vs AI",
    link: "game/ai",
  },
  {
    title: "Multiplayer",
    link: "game/id",
  },
  {
    title: "Stats",
    link: "stats",
  },
];
const MainMenu = () => {
  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${MainMenuImage})` }}
        className="bg-cover bg-center   w-full h-[500px] rounded-lg flex flex-col justify-center gap-5"
      >
        {Menus.map((menu) => (
          <MainMenuButton key={menu.link} {...menu} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MainMenu;
