import { When } from "react-if";
import { useContext } from "react";
import { LoginContext } from "../../context/auth/context.js";

function Auth(props) {
  let auth = useContext(LoginContext);
  const isLoggedIn = auth.loggedIn;
  const canDo = props.capability ? auth.canHandler(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return <When condition={okToRender}>{props.children}</When>;
}

export default Auth;
