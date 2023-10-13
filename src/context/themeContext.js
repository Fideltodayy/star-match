import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(() => {
    const localDarkMode = window.localStorage.getItem("darkMode");
    return localDarkMode ? JSON.parse(localDarkMode) : false;
  });

  useEffect(() => {
    const root = document.getElementById("root");
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
    root.classList.remove(darkMode ? "light" : "dark");
    root.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log(window.localStorage.getItem("darkMode"));
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
