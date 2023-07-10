import { FC, useState } from "react"; //to define a component
import { Box , CssBaseline} from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";
import {BuildingDrawer} from "./building-drawer"
import { getDrawerHeader } from "./mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";

export const BuildingViewer: FC = () => {
  //menus visibility
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [width] = useState(240); //from MUI

  // const [state,dispatch] = useAppContext()
  const [{ user, building }] = useAppContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!building) {
    return <Navigate to={"/map"} />;
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  //for propertiees, floor plans. building metadata
  const toggleFrontMenu = (active: boolean) => {
    setFrontOpen(active)
  }

const DrawerHeader = getDrawerHeader();  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <BuildingTopBar
        width={width}
        open={sideOpen}
        onOpen={() => toggleDrawer(true)}
      />

      <BuildingDrawer
        width={width}
        open={sideOpen}
        onClose={() => toggleDrawer(false)}
        onToggleMenu={() => toggleFrontMenu(true)}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingFrontMenu
          onToggleMenu={() => toggleFrontMenu(false)}
          open={frontOpen}
          mode="BuildingInfo"
        />

        <h1>Hello building viewer!</h1>
      </Box>
    </Box>
  );
}; //FC type - functional component
