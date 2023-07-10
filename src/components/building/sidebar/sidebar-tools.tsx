import { Action } from "../../../middleware/actions";
import { State } from "../../../middleware/state";
import { Tool } from "../../../types";
import ListIcon from "@mui/icons-material/ViewList";
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

export function getSidebarTools(
  state: State,
  dispatch: React.Dispatch<Action>,
  toggleMenu: () => void
): Tool[] {
  return [
    {
      name: "Info",
      icon: <ListIcon />,
      action: () => {
        toggleMenu();
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
      name: "Logout",
      icon: <LogoutIcon />,
      action: () => {
        dispatch({type: "LOGOUT"})
      }
    },
    {
      name: "Delete building",
      icon: <DeleteIcon />,
      action: () => {
        dispatch({type: "DELETE_BUILDING", payload: state.building})
      }
    },
  ];
}
