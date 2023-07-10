import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import { Box } from "@mui/material";
import "./front-menu-context.css";

export const BuildingInfoMenu: FC<{
  onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();

  const {building} = state;
  if (!building) {
    throw new Error("No building active!");

  }

  return ( <Box>
    <h1>Building info</h1>
  </Box>)

};
