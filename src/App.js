import React from 'react';
import SettingsProvider from './context/settings/context';
import ToDo from './components/todo/todo.js';
import '@blueprintjs/core/lib/css/blueprint.css'

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>

        <ToDo />
      </SettingsProvider>

    );
  }
}
