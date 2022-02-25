import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
const SECRET = process.env.REACT_APP_SECRET || "secretstring";

const testUsers = {
  admin: {
    password: "password",
    name: "Administrator",
    role: "admin",
    capabilities: ["create", "read", "update", "delete"],
  },
  editor: {
    password: "password",
    name: "Editor",
    role: "editor",
    capabilities: ["read", "update"],
  },
  writer: {
    password: "password",
    name: "Writer",
    role: "writer",
    capabilities: ["read", "create"],
  },
};

export const LoginContext = React.createContext();

function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [can, setCan] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [token, setToken] = useState("");

  const canHandler = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = (username, password) => {
    console.log("LOGIN", username, testUsers[username]);
    if (testUsers[username]) {
      // Create a "good" token, like you'd get from a server
      const token = jwt.sign(testUsers[username], SECRET);
      console.log("TOKEN", token);
      validateToken(token);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const validateToken = (token) => {
    try {
      let user = jwt.verify(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    setToken(token);
    setLoggedIn(loggedIn);
    setUser(user);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider
      value={{ loggedIn, canHandler, user, login, logout, token }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
