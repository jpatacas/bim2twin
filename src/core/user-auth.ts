import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
//import { Action } from "../middleware/actions";

export const userAuth = {
    login: () => {
       
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);

    },

    logout: () => {
        const auth = getAuth();
        signOut(auth);
    }
}