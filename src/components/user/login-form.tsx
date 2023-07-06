import { FC } from "react"; //to define a component
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
//import {getApp} from "firebase/app"

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
   // console.log("Logging in!");
    dispatch({type: "LOGIN"});

  };

  if (state.user) {
    return <Navigate to="/map"/>
  }

  return (
    <h1>
        <Button variant= "outlined"  onClick={onLogin}>Login</Button>
    </h1>
  );
}; //FC type - functional component
