import { mapHandler } from "../core/map/map-handler";
import { userAuth } from "../core/user/user-auth";
import { Action } from "./actions";

export const executeCore = (action: Action) => {
    if (action.type === "LOGIN") {
        userAuth.login()
    }
    if (action.type === "LOGOUT") {
        userAuth.logout()
    }
    if (action.type === "START_MAP") {
        const {user, container } = action.payload
        mapHandler.start(container)
        
    }
    if (action.type === "REMOVE_MAP") {
        mapHandler.remove()
    }

}