import { useState, useContext } from "react";
import { When } from "react-if";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FormGroup, InputGroup, Radio, RadioGroup, Button, } from "@blueprintjs/core";
import { LoginContext } from "../../context/auth/context";

function Login() {
  const auth = useContext(LoginContext);
  let [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    role: "",
  });

  let handleChange = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    auth.signup(userInfo);
  };
  console.log(userInfo);

  return (
    <>
      <When condition={auth.loggedIn}>
        <button onClick={auth.logout}>Log Out</button>
      </When>
      <When condition={!auth.loggedIn}>
        <form onSubmit={handleSubmit}>
          <InputGroup
            placeholder="UserName"
            name="username"
            onChange={handleChange}
            style={{ margin: "10px" }}
          />
          <InputGroup
            placeholder="password"
            name="password"
            onChange={handleChange}
            style={{ margin: "10px" }}
          />
          <RadioGroup
            style={{ margin: "10px" }}
            onChange={handleChange}
            label="User roles"
            name="role"
          >
            <Radio label="admin" value="admin" />
            <Radio label="user" value="user" />
          </RadioGroup>
          <Button type="submit">Login</Button>
        </form>
        {}
      </When>
    </>
  );
}

export default Login;
