import { FC } from "react"; //to define a component
import { useAppContext } from "../../middleware/context-provider";
import { type } from "os";
//import {getApp} from "firebase/app"

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
    console.log("Logging in!");
    dispatch({type: "LOGIN"});
    
  };

  return (
    <h1>
      {state.user ? (
        <p>{state.user.displayName}</p>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </h1>
  );
}; //FC type - functional component
