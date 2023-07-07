import { mapHandler } from "../core/map/map-handler";
import { userAuth } from "../core/user/user-auth";
import { Action } from "./actions";
import { Events } from "./event-handler";

export const executeCore = (action: Action, events: Events) => {
    if (action.type === "LOGIN") {
        userAuth.login()
    }
    if (action.type === "LOGOUT") {
        userAuth.logout()
    }
    if (action.type === "START_MAP") {
        const {container, user } = action.payload
        mapHandler.start(container, user, events)
        
    }
    if (action.type === "REMOVE_MAP") {
        mapHandler.remove()
    }
    if (action.type === "ADD_BUILDING") {
        mapHandler.addBuilding(action.payload)
    }

}