import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { Tool } from "../../../types";
import { FrontMenuMode } from "../types";

import ListIcon from "@mui/icons-material/ViewList";
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import ModelIcon from '@mui/icons-material/HolidayVillage';

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: (active: boolean, mode?: FrontMenuMode) => void
): Tool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toggleMenu(true, "BuildingInfo"); //true, "mode of the menu"
      }
    },
    {
      name: "Model list",
      icon: <ModelIcon />,
      action: () => {
        toggleMenu(true, "ModelList"); //true, "mode of the menu"
      }
    },
    {
      name: "Delete building",
      icon: <DeleteIcon />,
      action: () => {
        dispatch({type: "DELETE_BUILDING", payload: state.building})
      }
    },
    {
      name: "Back to map",
      icon: <MapIcon />,
      action: () => {
        dispatch({type: "CLOSE_BUILDING"})
      }
    },
    {
      name: "Log out",
      icon: <LogoutIcon />,
      action: () => {
        dispatch({type: "LOGOUT"})
      },
    },
  ];
}
