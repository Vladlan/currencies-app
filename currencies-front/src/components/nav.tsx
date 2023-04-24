import React from "react";
import { MoonIcon } from "./../icons/Moon";
import { toggleDarkMode } from "../utils/toggle-dark-mode";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-4">
      <div className="w-10" />
      <h1 className="dark:text-white text-2xl font-bold">{"Currencies App"}</h1>
      <button
        className="flex p-2 text-black rounded hover:text-yellow-400 dark:text-white focus:outline-none hover:bg-gray-500 dark:hover:bg-gray-500 dark:hover:text-yellow-400"
        onClick={toggleDarkMode}
      >
        <MoonIcon />
      </button>
    </nav>
  );
};

export default Nav;
