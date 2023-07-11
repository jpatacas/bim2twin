import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { getDownloadURL, ref } from "firebase/storage";
import { Building } from "../../types";


// CORS problem solution: https://stackoverflow.com/a/58613527

export class BuildingDatabase {
    async getModels (building: Building) {
        const appInstance = getApp();
        const storageInstance = getStorage(appInstance);

        const urls: string[] = [];

        for (const model of building.models) {
            const fileRef = ref(storageInstance, model.id);
            const fileUrl = await getDownloadURL(fileRef);
            urls.push(fileUrl);

        }
        return urls;
    }
}