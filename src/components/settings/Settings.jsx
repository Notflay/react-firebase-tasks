import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const defaultConfig = {
  theme: "dark",
  lang: "es",
};

const Settings = ({ toggleDark }) => {
  const [config, setConfig] = useLocalStorage("config", defaultConfig);

  /**
   * Función para intercambiar ligth <-> dark
   * @param {*} event - Evento de click proveniente de React
   */
  const handleClick = (event) => {
    event.preventDefault();
    setConfig((oldConfig) => ({
      ...oldConfig,
      theme: oldConfig.theme === "ligth" ? "dark" : "ligth",
    }));
    toggleDark(config.theme);
  };

  return (
    <div className="text-center">
      <hr className="my-4" />
      <h1 className="text-3xl text-cyan-800 font-semibold mb-4 dark:text-cyan-400">
        APP SETTINGS
      </h1>
      <p className="text-sm">
        Actual Config:
        {config.theme}
      </p>
      <button className="btn mt-4" type="button" onClick={handleClick}>
        Toggle DarkMode
      </button>
    </div>
  );
};

export default Settings;
