import { Action } from "../middleware/actions";

export const userAuth = {
    login: (action: Action) => {
       
        if (action.payload) {
            console.log(`User ${action.payload.displayName} logged`)
        }
        else{
            console.log("No user logged")
        }
    }
}