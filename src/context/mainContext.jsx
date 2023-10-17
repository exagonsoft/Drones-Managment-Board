import React, { createContext, useEffect, useState } from "react";
export const Context = createContext(null);


export const MainContext = ({ children }) => {
  const [eventEmitted, setEventEmitted] = useState(0);

  const emitEvent = () => {
    if(eventEmitted < 6000000){
      setEventEmitted(eventEmitted + 1);
    }else{
      setEventEmitted(0);
    }
  }

  const freezeScreen = () => {
    document.body.style.overflowY = "hidden";
  }

  const unFreezeScreen = () => {
    document.body.style.overflowY = "auto";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      emitEvent();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [eventEmitted]);

  return (
    <Context.Provider
      value={{
        freezeScreen,
        unFreezeScreen,
        eventEmitted
      }}
    >
      {children}
    </Context.Provider>
  );
};
