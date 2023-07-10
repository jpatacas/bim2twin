import { FC, useState } from "react"; //to define a component
import { Button, Box } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";

export const BuildingViewer: FC = () => {
  //menus visibility
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [width] = useState(240); //from MUI

  // const [state,dispatch] = useAppContext()
  const [{ user, building }] = useAppContext();

  if (!building) {
    return <Navigate to={"/map"} />;
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}></Box>
      <BuildingTopBar
        width={width}
        open={sideOpen}
        onOpen={() => toggleDrawer(true)}
      />
    </>
  );
}; //FC type - functional component
