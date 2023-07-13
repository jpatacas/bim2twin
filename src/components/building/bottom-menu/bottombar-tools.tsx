import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";
import LayersIcon from "@mui/icons-material/Layers";
// import { Action } from "../../../middleware/actions";
// import { State } from "../../../middleware/state";
import { Tool } from "../../../types";

export function getBottombarTools (
    // state: State,
    // dispatch: React.Dispatch<Action>
    
): Tool[] {
    const tools = [
        {
          name: "Clipping planes",
          icon: <CutIcon />,
          active: false,
          action: (dispatch: any) => {
            console.log("hei");
          },
        },
        {
          name: "Dimensions",
          icon: <RulerIcon />,
          active: false,
          action: (dispatch: any) => {
            console.log("hei");
          },
        },
        {
          name: "Explosion",
          icon: <ExplodeIcon />,
          active: false,
          action: (dispatch: any) => {
            const tool = tools.find((tool) => tool.name === "Explosion");
            if (tool) {
              tool.active = !tool.active;
              dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
            }
          },
        },
        {
          name: "Floor plan navigation",
          icon: <LayersIcon />,
          active: false,
          action: (dispatch: any) => {
            console.log("hei");
          },
        },
      ];
      return tools;
}