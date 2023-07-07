import {addDoc, collection, getFirestore, onSnapshot, query, where} from "firebase/firestore"
import { User } from 'firebase/auth';
import { getApp } from 'firebase/app';

import { Building } from './../../types';
export class MapDatabase {
    private readonly buildings = "buildings";

    async add(building: Building) {
        const dbInstance = getFirestore (getApp())
        const {lat, lng, userID} = building;
        const result = await addDoc(collection(dbInstance, this.buildings), {
            lat,
            lng,
            userID
        })
        return result.id
    }

    async getBuildings(user: User) {
        const dbInstance = getFirestore(getApp())
        const q = query(
            collection(dbInstance, this.buildings),
            where("userID", "==", user.uid)
        )

        return new Promise<Building[]>((resolve) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const result: Building[] = []
                snapshot.docs.forEach((doc) => {
                    result.push({...(doc.data() as Building), uid: doc.id})
                })
                unsubscribe();
                resolve(result)
            })
        })
    }
}