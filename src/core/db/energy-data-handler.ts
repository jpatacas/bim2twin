import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { EnergyData } from "../../types";
import { getApp } from "firebase/app";

export const energyDataHandler = {
  addEnergyData: async (energyData: EnergyData) => {
    const dbInstance = getFirestore(getApp());

    await addDoc(collection(dbInstance, "energyData"), energyData);
  },

  updateEnergyData: async (buildingId: string, energyData: EnergyData) => {
    const dbInstance = getFirestore();
    const energyDataRef = doc(dbInstance, "energyData", buildingId);
    const monthDataRef = collection(energyDataRef, "months");
    await setDoc(doc(monthDataRef, energyData.month), energyData, {
      merge: true,
    });
  },

  getEnergyData: async (buildingId: string): Promise<EnergyData[]> => {
    const dbInstance = getFirestore();
    const energyDataRef = collection(dbInstance, "energyData"); // Remove buildingId here
    const querySnapshot = await getDocs(energyDataRef);

    const energyDataArray: EnergyData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        energyDataArray.push({
          buildingId,
          month: data.month,
          electricity: data.electricity,
          gas: data.gas,
          solar: data.solar,
          wind: data.wind,
        });
      }
    });

    // Sort energy data by month before returning
    energyDataArray.sort((a, b) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

    return energyDataArray;
  },
};
