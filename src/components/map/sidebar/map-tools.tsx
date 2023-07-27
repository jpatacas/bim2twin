import LogoutIcon from "@mui/icons-material/Logout";
import AddBuildingIcon from "@mui/icons-material/DomainAdd";
import BuildingIcon from '@mui/icons-material/Domain';
import { Action } from "../../../middleware/actions";

//import { FrontMenuMode } from "../types";
import { Building, Tool } from "../../../types";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { User } from "firebase/auth";

///get from db/middleware
// async getBuildings(user: User) from map-database.ts (core)
export async function fetchBuildingsData(userUID: string): Promise<Building[]> {
  const dbInstance = getFirestore();
  const q = query(collection(dbInstance, "buildings"), where("userID", "==", userUID));

  const snapshot = await getDocs(q);

  const buildings: Building[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Building),
    uid: doc.id,
  }));

  return buildings;
}

export async function getMapTools(
  
    //   state: State,
  dispatch: React.Dispatch<Action>,
  //   toggleMenu: (active: boolean) => void,
  isCreating: boolean,
  onToggleCreate: () => void,
  user: User | null
): Promise<Tool[]> {
  if (user) {
    const userUID = user.uid;
    const buildings = await fetchBuildingsData(userUID);

    // ... (rest of the code to create buildingTools)
    const buildingTools = buildings.map((building) => ({
      name: building.uid,
      active: false,
      icon: (
        <BuildingIcon />
      ),
      action: () => {
        // Do something when the tool is clicked
        console.log(building.uid)
      },
    }));

    return [
      {
        name: "Create Building",
        active: isCreating,
        icon: <AddBuildingIcon />,
        action: onToggleCreate,
        // action: () => {
        //   dispatch({ type: "ADD_BUILDING", payload: state.user });
        // },
      },
      ...buildingTools,
      {
        name: "Log out",
        active: false,
        icon: <LogoutIcon />,
        action: () => {
          dispatch({ type: "LOGOUT" });
        },
      },
    ];
  } else {
    // If user is not available, return an empty array or handle the case accordingly.
    return [];
  }
}

