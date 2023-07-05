import { Action } from "../middleware/actions";

export const userAuth = {
    login: (action: Action) => {
        const name = action.payload.displayName;
        if (name) {
            console.log(`User ${name} logged`)
        }
    }
}