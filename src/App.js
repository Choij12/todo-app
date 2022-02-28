import SettingsProvider from "./context/settings/context";
import ToDo from "./components/todo/todo.js";
import "@blueprintjs/core/lib/css/blueprint.css";
import Theme from "./context/theme";
import LoginContext from "./context/auth/context";
import Login from "./components/login/login";
import Auth from "./components/auth/auth";

function App() {
  return (
    <LoginContext>
      <Login />
      <Theme>
        <Auth capability="read">
          <SettingsProvider>
            <ToDo />
          </SettingsProvider>
        </Auth>
      </Theme>
    </LoginContext>
  );
}

export default App;
