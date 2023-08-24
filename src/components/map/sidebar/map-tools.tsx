import LogoutIcon from "@mui/icons-material/Logout";
import AddBuildingIcon from "@mui/icons-material/DomainAdd";
import BuildingIcon from "@mui/icons-material/Domain";

import { Action } from "../../../middleware/actions";
import { Building, Tool } from "../../../types";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";

async function fetchBuildingsData(userUID: string): Promise<Building[]> {
  const dbInstance = getFirestore();
  const q = query(
    collection(dbInstance, "buildings"),
    where("userID", "==", userUID)
  );

  const snapshot = await getDocs(q);

  const buildings: Building[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Building),
    uid: doc.id,
  }));

  return buildings;
}

// Add an additional parameter newBuilding to the function
export async function getMapTools(
  dispatch: React.Dispatch<Action>,
  isCreating: boolean,
  onToggleCreate: () => void,
  user: User | null,
  newBuilding: Building | null
): Promise<Tool[]> {
  const tools: Tool[] = [];
  if (user) {
    const userUID = user.uid;
    const buildings = await fetchBuildingsData(userUID);

    const buildingTools = buildings.map((building) => ({
      name: building.name === "" ? "Building" : building.name,
      active: newBuilding ? building.uid === newBuilding.uid : false,
      icon: <BuildingIcon />,
      action: () => {
        dispatch({
          type: "CENTER_MAP",
          payload: { lat: building.lat, lng: building.lng },
        });
        //}
      },
    }));

    tools.push(
      {
        name: "Create Building",
        active: isCreating,
        icon: <AddBuildingIcon />,
        action: onToggleCreate,
      },
      ...buildingTools,
      {
        name: "Log out",
        active: false,
        icon: <LogoutIcon />,
        action: () => {
          dispatch({ type: "LOGOUT" });
        },
      }
    );
  }

  return tools;
}
