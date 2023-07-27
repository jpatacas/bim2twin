import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { NavBar } from "../navbar/navbar";
import "./map-viewer.css";
import { Drawer } from "../map/sidebar/drawer";
import { getMapTools } from "../map/sidebar/map-tools"; // Import the updated getMapTools function
import { Tool } from "../../types";
//import { FrontMenuMode } from "../../building/types";

export const MapViewer: FC = () => {
  const containerRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]); // State to store the tools

  const [state, dispatch] = useAppContext();
  const { user, building } = state;

  const [width] = useState(240);
  const [sideOpen, setSideOpen] = useState(false);

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const toggleFrontMenu = () => {};

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const fetchTools = async () => {
      if (user) {
        const userUID = user.uid;

        try {
          const tools = await getMapTools(dispatch, isCreating, onToggleCreate, user);
          setTools(tools);
        } catch (error) {
          console.error("Error fetching buildings data:", error);
          setTools([]);
        }
      }
    };

    fetchTools();
  }, [user]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: { container, user } });
    }

    // Cleanup function when component is unmounted
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

      <div onContextMenu={onCreate} className="full-screen" ref={containerRef} />
      {isCreating && (
        <div className="overlay">
          <p>Right click to create a new Building or</p>
          <Button onClick={onToggleCreate}>cancel</Button>
        </div>
      )}
    </>
  );
};


