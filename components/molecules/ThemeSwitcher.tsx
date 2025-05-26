import useDarkMode from "@/lib/store/useDarkMode";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { enable, setIsEnable } = useDarkMode();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  function handleSwitchTheme() {
    const classList = document.documentElement.classList;
    const isHasDarkModeClass = Array.from(classList).includes("dark");
    setIsEnable(!isHasDarkModeClass);
    if (isHasDarkModeClass) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }

  useEffect(() => {
    if (isMounted) {
      const classList = document.documentElement.classList;
      const isHasDarkModeClass = Array.from(classList).includes("dark");
      setIsEnable(isHasDarkModeClass);
    }
  }, [isMounted]);
  return (
    <button onClick={handleSwitchTheme} className="flex items-center justify-center">
      {enable ? <RiMoonClearFill /> : <RiSunFill />}
    </button>
  );
};

export default ThemeSwitcher;
