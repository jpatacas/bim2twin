import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Building, EnergyData, Model, Document } from "../../types";
import { Events } from "../../middleware/event-handler";
import { getFirestore, deleteDoc, doc, updateDoc ,collection, query, where, onSnapshot } from "firebase/firestore";
import { getApp } from "firebase/app";
//import { Action } from "../middleware/actions";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import { buildingHandler } from "../building/building-handler";
import { energyDataHandler } from "./energy-data-handler";

export const databaseHandler = {
  login: () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },

  deleteBuilding: async (building: Building, events: Events) => {
    
    const app = getApp()
    const dbInstance = getFirestore();
    await deleteDoc(doc(dbInstance, "buildings", building.uid));
    //delete all models assigned to building
    const storageInstance = getStorage(app)
    const ids: string[] = [];

    for (const model of building.models) {
      const fileRef = ref(storageInstance, model.id)
      await deleteObject(fileRef)
      ids.push(model.id)
    }
    
    await buildingHandler.deleteModels(ids)
    events.trigger({ type: "CLOSE_BUILDING" });
  },

  updateBuilding: async (building: Building) => {
    const dbInstance = getFirestore(getApp());
    await updateDoc(doc(dbInstance, "buildings", building.uid), {
      ...building,
    });
  },

  uploadModel: async (
    model: Model,
    file: File,
    building: Building,
    events: Events
  ) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await uploadBytes(fileRef, file);
    await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
  },

  deleteModel: async (model: Model, building: Building, events: Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await deleteObject(fileRef);
    await buildingHandler.deleteModels([model.id]);
    await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
  },

  async getBuildings(user: User): Promise<Building[]> {
    const dbInstance = getFirestore(getApp());
    const q = query(collection(dbInstance, "buildings"), where("userID", "==", user.uid));

    return new Promise<Building[]>((resolve) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const result: Building[] = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...(doc.data() as Building), uid: doc.id });
        });
        unsubscribe();
        resolve(result);
      });
    });
  },

  addEnergyData: async (energyData: EnergyData) => {
    await energyDataHandler.addEnergyData(energyData);
  },

  updateEnergyData: async (buildingId: string, energyData: EnergyData) => {
    await energyDataHandler.updateEnergyData(buildingId, energyData);
  },

  getEnergyData: async (buildingId: string): Promise<EnergyData[]> => {
    return await energyDataHandler.getEnergyData(buildingId);
  },

  uploadDocument: async (
    document: Document,
    file: File,
    building: Building,
    events: Events
  ) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, document.id);
    await uploadBytes(fileRef, file);
    // await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
  },

  deleteDocument: async (document: Document, building: Building, events: Events) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, document.id);
    await deleteObject(fileRef);
    // await buildingHandler.deleteModels([model.id]);
    // await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
  },

};
