import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Building, Model } from "../../types";
import { Events } from "../../middleware/event-handler";
import { getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
//import { Action } from "../middleware/actions";
import {deleteObject, getStorage, ref, uploadBytes} from "firebase/storage"

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

    deleteBuilding: async (building:Building, events: Events) => {
        //const id = building.uid;
        const dbInstance = getFirestore(getApp())
        await deleteDoc(doc(dbInstance, "buildings", building.uid))
        events.trigger({type: "CLOSE_BUILDING"})


    },

    updateBuilding: async (building:Building) => {
        const dbInstance = getFirestore(getApp())
        await updateDoc(doc(dbInstance, "buildings", building.uid), {
            ...building,
        })
    },

    uploadModel: async (model: Model, file: File, building: Building, events: Events) => {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        await uploadBytes(fileRef, file);
        events.trigger({type: "UPDATE_BUILDING", payload: building})
    },

    deleteModel: async (model: Model, building: Building, events: Events) => {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);
        const fileRef = ref(storageInstance, model.id);
        await deleteObject(fileRef);
        events.trigger({type: "DELETE_BUILDING", payload: building})
    }

}