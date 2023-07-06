import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAppContext } from "./context-provider";
import {FC, useEffect} from "react"

let authInitialized = false;

export const Authenticator: FC = () => {
    const auth = getAuth();
    const dispatch = useAppContext()[1]; //same as const [state, dispatch] = useAppContext();

    const listenToAuthChanges = () => { //called when user authenticates to firebase
        onAuthStateChanged(auth, (foundUser) => {
            const user = foundUser ? {...foundUser} : null; //if foundUser is there copy it, otherwise null
            dispatch({type: "UPDATE_USER", payload: user})
        })
    }

        useEffect(()=> {
            if (!authInitialized) {
                listenToAuthChanges();
                authInitialized = true;
        }
        }, [])

        return <></>;
}