import React, { useState } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  let [hide, setHide] = useState(false);
  let [numItems, setNumItems] = useState(3);
  let [sort, setSort] = useState("difficulty");

  return (
    <SettingsContext.Provider
      value={{ hide, numItems, sort, setNumItems, setHide }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
