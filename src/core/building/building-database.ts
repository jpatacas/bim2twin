import { FirebaseStorage, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { getDownloadURL, ref } from "firebase/storage";
import { Building } from "../../types";
import { ModelDatabase } from "./dexie-utils";


// CORS problem solution: https://stackoverflow.com/a/58613527

export class BuildingDatabase {
    private db = new ModelDatabase();
    
    async getModels (building: Building) {

        await this.db.open()

        const appInstance = getApp();
        const instance = getStorage(appInstance);

        const urls: string[] = [];

        for (const model of building.models) {
            const url = await this.getModelURL(instance, model.id)
            urls.push(url);
        }

        this.db.close() //clear memory
        return urls;
    }

    async clearCache(building: Building) {
        await this.db.open();
        for (const model of building.models) {
            localStorage.removeItem(model.id)
        }
        await this.db.delete() //deletes whole db
        this.db = new ModelDatabase();
        this.db.close();

    }

    async deleteModel (id:string) {
        await this.db.open();
        if (this.isModelCached(id)) {
            localStorage.removeItem(id);
            await this.db.models.where("id").equals(id).delete();
        }
        this.db.close()
    }


    private async getModelURL(instance: FirebaseStorage, id: string) {
        if (this.isModelCached(id)) {
            //get model from dexie (user's computer)
            return this.getModelFromLocalCache(id);
        } else {
            //get model from firebase
            return this.getModelFromFirebase(instance, id);
        }
    }

    private async getModelFromFirebase(instance: FirebaseStorage, id: string) {
        const fileRef = ref(instance, id);
        const url = await getDownloadURL(fileRef);
        await this.cacheModel(id, url);
        console.log("Got model from firebase then cached it"!);
        return url;
    }

    private async getModelFromLocalCache (id: string) {
        const found = await this.db.models.where("id").equals(id).toArray();
        const file = found[0].file;
        console.log("Got model from local cache!")
        return URL.createObjectURL(file)
    }

    private isModelCached (id: string) {
        const stored = localStorage.getItem(id);
        return stored !== null;
    }

    private async cacheModel (id: string, url: string) {
        const time = performance.now().toString();
        localStorage.setItem(id, time);
        const rawData = await fetch(url);
        const file = await rawData.blob()
        await this.db.models.add({
            id,
            file,
        })
    }

}