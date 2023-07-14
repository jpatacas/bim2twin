import { mapHandler } from "../core/map/map-handler";
import { databaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";
import { buildingHandler } from "../core/building/building-handler";

export const executeCore = async (action: Action, events: Events) => {
    if (action.type === "LOGIN") {
        return databaseHandler.login()
    }
    if (action.type === "LOGOUT") {
        buildingHandler.remove()
        mapHandler.remove()
        return databaseHandler.logout()
    }
    if (action.type === "START_MAP") {
        const {container, user } = action.payload;
        return mapHandler.start(container, user, events);
    }
    if (action.type === "REMOVE_MAP" || action.type === "OPEN_BUILDING") {
        return mapHandler.remove();
    }
    if (action.type === "ADD_BUILDING") {
        return mapHandler.addBuilding(action.payload);
    }
    if (action.type === "DELETE_BUILDING") {
        return databaseHandler.deleteBuilding(action.payload, events);
    }
    if (action.type === "UPDATE_BUILDING") {
        return databaseHandler.updateBuilding(action.payload);
    }
    if (action.type === "UPLOAD_MODEL") {
        const {model, file, building} = action.payload;
        const zipFile = await buildingHandler.convertIfcToFragments(file)
        return databaseHandler.uploadModel(model, zipFile, building, events);
    }
    if (action.type === "DELETE_MODEL") {
        const {model, building} = action.payload;
        return databaseHandler.deleteModel(model, building, events);
    }
    if (action.type === "START_BUILDING") {
        const {container, building} = action.payload;
        return buildingHandler.start(container, building)
    }
    if (action.type === "CLOSE_BUILDING") {
        return buildingHandler.remove();
    }
    if (action.type === "EXPLODE_MODEL") {
        return buildingHandler.explode(action.payload);
      }
    if (action.type === "TOGGLE_CLIPPER") {
        return buildingHandler.toggleClippingPlanes(action.payload);
    }
    if (action.type === "TOGGLE_DIMENSIONS") {
        return buildingHandler.toggleDimensions(action.payload);
    }
    if (action.type === "TOGGLE_FLOORPLAN") {
        return buildingHandler.toggleFloorplan(action.payload);
    }
}