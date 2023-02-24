import React, { useState } from "react";
import Tasklist from "./components/lists/Tasklist";
import Settings from "./components/settings/Settings";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  let config = JSON.parse(localStorage.getItem("config"));
  if (config === null) {
    config = {
      theme: "ligth",
      lang: "es",
    };
  }
  const [dark, setDark] = useState(config.theme);
  const [showSettings, setShowSettings] = useState(false);

  /**
   * Funcíon para cambiar el estado del dark y así poder cambiar
   * la className
   * @param {*} theme valor de config.theme
   */
  const toggleDark = (theme) => {
    console.log(theme);
    setDark(theme);
  };
  return (
    <div className={`${dark === "dark" ? "dark" : ""}`}>
      <div
        className={`h-screen p-4 flex flex-col bg-gray-100 dark:bg-slate-800 transition dark:text-gray-50`}
      >
        <Tasklist
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <AnimatePresence
          initial={false}
          exit={true}
          onExitComplete={() => null}
        >
          {showSettings && (
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: "0" }}
              exit={{ y: "100vh" }}
              toggleDark={toggleDark}
            >
              <Settings toggleDark={toggleDark} />
            </motion.div>
          )}
        </AnimatePresence>  
      </div>
    </div>
  );
}

export default App;
