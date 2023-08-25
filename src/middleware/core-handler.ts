import { mapHandler } from "../core/map/map-handler";
import { databaseHandler } from "../core/db/db-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";
import { buildingHandler } from "../core/building/building-handler";
import { energyDataHandler } from "../core/db/energy-data-handler";

export const executeCore = async (action: Action, events: Events) => {
  if (action.type === "LOGIN") {
    return databaseHandler.login();
  }
  if (action.type === "LOGOUT") {
    buildingHandler.remove();
    mapHandler.remove();
    return databaseHandler.logout();
  }
  if (action.type === "START_MAP") {
    const { container, user } = action.payload;
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
    const { model, file, building } = action.payload;
    const zipFile = await buildingHandler.convertIfcToFragments(file);
    return databaseHandler.uploadModel(model, zipFile, building, events);
  }
  if (action.type === "DELETE_MODEL") {
    const { model, building } = action.payload;
    return databaseHandler.deleteModel(model, building, events);
  }
  if (action.type === "START_BUILDING") {
    const { container, building } = action.payload;
    return buildingHandler.start(container, building, events);
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
    const { active, floorplan } = action.payload;
    return buildingHandler.toggleFloorplan(active, floorplan);
  }
  if (action.type === "GET_BUILDINGS") {
    // Assuming you have the current user object from Firebase Auth
    const user = action.payload;
    if (user) {
      return databaseHandler.getBuildings(user);
    }
    // Return something or handle the case when the user is not authenticated
    return null;
  }
  if (action.type === "CENTER_MAP") {
    const { lat, lng } = action.payload;
    return mapHandler.centerMap(lat, lng);
  }
  if (action.type === "GET_ENERGY_DATA") {
    const buildingId = action.payload; // Assuming action.payload contains the building ID
    const energyData = await energyDataHandler.getEnergyData(buildingId);
    return energyData;
  }

  if (action.type === "ADD_ENERGY_DATA") {
    const energyData = action.payload; // Assuming action.payload contains the necessary data
    await energyDataHandler.addEnergyData(energyData);
    // Optionally, you can refresh the energy data in the component using the provided events
    // Call the relevant event or update the UI as needed
  }
  if (action.type === "UPLOAD_DOCUMENT") {
    const { document, file, building } = action.payload;
    return databaseHandler.uploadDocument(document, file, building, events);
  }
  if (action.type === "DELETE_DOCUMENT") {
    const { document, building } = action.payload;
    return databaseHandler.deleteDocument(document, building, events);
  }
};
