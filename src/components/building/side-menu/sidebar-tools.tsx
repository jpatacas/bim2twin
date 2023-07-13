
import ListIcon from "@mui/icons-material/ViewList";
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import ModelIcon from '@mui/icons-material/HolidayVillage';
import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { FrontMenuMode } from "../types";
import { Tool } from "../../../types";

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: (active: boolean, mode?: FrontMenuMode) => void
): Tool[] {
  return [
    {
      name: "Info",
      active: false,
      icon: <ListIcon />,
      action: () => {
        toggleMenu(true, "BuildingInfo"); //true, "mode of the menu"
      }
    },
    {
      name: "Model list",
      active: false,
      icon: <ModelIcon />,
      action: () => {
        toggleMenu(true, "ModelList"); //true, "mode of the menu"
      }
    },
    {
      name: "Delete building",
      active: false,
      icon: <DeleteIcon />,
      action: () => {
        dispatch({type: "DELETE_BUILDING", payload: state.building})
      }
    },
    {
      name: "Back to map",
      active: false,
      icon: <MapIcon />,
      action: () => {
        dispatch({type: "CLOSE_BUILDING"})
      }
    },
    {
      name: "Log out",
      active:false,
      icon: <LogoutIcon />,
      action: () => {
        dispatch({type: "LOGOUT"})
      },
    },
  ];
}
