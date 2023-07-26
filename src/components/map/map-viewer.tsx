import { FC, useRef, useEffect, useState } from "react"; //to define a component
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { NavBar } from "../navbar/navbar";
import "./map-viewer.css";
import { Drawer } from "./sidebar/drawer";
import { getMapTools } from "./sidebar/map-tools";

export const MapViewer: FC = () => {
  const containerRef = useRef(null); //canvas where mapbox scene will be rendered
  const [isCreating, setIsCreating] = useState(false);

  const [state, dispatch] = useAppContext();
  const { user, building } = state;

  //menus visibility
  const [width] = useState(240); //from MUI
  const [sideOpen, setSideOpen] = useState(false);

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  //for propertiees, floor plans. building metadata
  const toggleFrontMenu = () => {};

  
  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };
  const tools = getMapTools( dispatch,  isCreating, onToggleCreate);

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(false);
    }
  };

  //when component starts
  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: { container, user } }); // need user to load all buildings that belong to this user
    }

    console.log(state)
    // //called when component is destroyed - removing this, map not removed when leave map page?
    return () => {
      dispatch({ type: "REMOVE_MAP" });
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (building) {
    const url = `/building?id=${building.uid}`;
    return <Navigate to={url} />;
  }

  //passing it using the tools instead

  // const onLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  return (
    <>
      <NavBar width={width} open={sideOpen} onOpen={() => toggleDrawer(true)} />
      <Drawer
        width={width}
        open={sideOpen}
        onClose={() => toggleDrawer(false)}
        onToggleMenu={toggleFrontMenu}
        tools={tools}
        isCreating={isCreating}
      />

      <div
        onContextMenu={onCreate}
        className="full-screen"
        ref={containerRef}
      />
      {isCreating && (
        <div className="overlay">
          <p>Right click to create a new Building or</p>
          <Button onClick={onToggleCreate}>cancel</Button>
        </div>
      )}
      {/* <div className="gis-button-container">
        <Button variant="contained" onClick={onToggleCreate}>
          Create building
        </Button>
        <Button variant="contained" onClick={onLogout}>
          Log out
        </Button>
      </div> */}
    </>
  );
}; //FC type - functional component
