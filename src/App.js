import React from "react";
import SettingsProvider from "./context/settings/context";
import ToDo from "./components/todo/todo.js";
import "@blueprintjs/core/lib/css/blueprint.css";
import Theme from "./context/theme";
export default class App extends React.Component {
  render() {
    return (
      <Theme>
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>
      </Theme>
    );
  }
}
