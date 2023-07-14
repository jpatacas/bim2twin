import { FC } from "react"; //to define a component
import { Navigate } from "react-router-dom";
import { Box, Button  } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import "./user-styles.css";
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
    <Box
    sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <img className="landing-logo" alt="ifcjs logo" src="ifcjs-logo.png" />

    <Button variant="outlined" onClick={onLogin}>
      Login
    </Button>
  </Box>

    // <h1>
    //     <Button variant= "outlined"  onClick={onLogin}>Login</Button>
    // </h1>
  );
}; //FC type - functional component
