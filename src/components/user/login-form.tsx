import { FC } from "react"; //to define a component
import { useAppContext } from "../../middleware/context-provider";
import { type } from "os";
import { Button } from "@mui/material";
//import {getApp} from "firebase/app"

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
   // console.log("Logging in!");
    dispatch({type: "LOGIN"});

  };

  const onLogout = () => {
    dispatch({type: "LOGOUT"})
  }

  return (
    <h1>
      {state.user ? (
        <>
        <p>{state.user.displayName}</p>
        <Button variant= "outlined" onClick={onLogout}>Log out</Button>
        </>
      ) : (
        <Button variant= "outlined"  onClick={onLogin}>Login</Button>
      )}
    </h1>
  );
}; //FC type - functional component
