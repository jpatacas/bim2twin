import { FC, useState } from "react"; //to define a component
import { Box , CssBaseline} from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./side-menu/building-topbar";
import {BuildingDrawer} from "./side-menu/building-drawer"
import { getDrawerHeader } from "./side-menu/mui-utils"
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/building-viewport";

export const BuildingViewer: FC = () => {
  //menus visibility
  const [width] = useState(240); //from MUI
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMenu, setFrontMenu] = useState<FrontMenuMode>("BuildingInfo")

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
  const toggleFrontMenu = (active: boolean, mode?: FrontMenuMode) => {

    if (mode) {
      setFrontMenu(mode)
    }
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
        onToggleMenu={toggleFrontMenu}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingFrontMenu
          onToggleMenu={() => toggleFrontMenu(false)}
          open={frontOpen}
          mode={frontMenu}
        />

        <BuildingViewport /> 
      </Box>
    </Box>
  );
}; //FC type - functional component
