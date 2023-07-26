import LogoutIcon from "@mui/icons-material/Logout";
import AddBuildingIcon from "@mui/icons-material/DomainAdd";
import BuildingIcon from '@mui/icons-material/Domain';
import { Action } from "../../../middleware/actions";

//import { FrontMenuMode } from "../types";
import { Tool } from "../../../types";



///get from db/middleware
// async getBuildings(user: User) from map-database.ts (core)

  
const buildings = [
  {
    lat: "53.11009208610392",
    lng: "-0.14611208808307197",
    models: [
      {
        id: "TESTED_Simple_project_01.ifc-34733",
        name: "TESTED_Simple_project_01.ifc",
      },
    ],
    name: "",
    uid: "170rZvQ4jow66BCx3GYz",
    userID: "61hAMdMKlTU2XLh5H3xOY2QyV5l1",
  },
  {
    lat: "53.11009208610392",
    lng: "-0.14611208808307197",
    models: [
      {
        id: "TESTED_Simple_project_01.ifc-34733",
        name: "TESTED_Simple_project_01.ifc",
      },
    ],
    name: "",
    uid: "170rZvQ4jowjhjk66BCx3GYz",
    userID: "61hAMdMKlTU2XLh5H3xOY2QyV5l1",
  },
];
// Create a tool for each building
const buildingTools = buildings.map((building) => ({
  name: building.uid,
  active: false,
  icon: (
    <BuildingIcon />
  ),
  action: () => {
    // Do something when the tool is clicked
  },
}));
//get the data from get builings

export function getMapTools(
  //   state: State,
  dispatch: React.Dispatch<Action>,
  //   toggleMenu: (active: boolean) => void,
  isCreating: boolean,
  onToggleCreate: () => void
): Tool[] {
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
}
