import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
//import { Action } from "../middleware/actions";

export const userAuth = {
    login: () => {
       
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);

    }
}