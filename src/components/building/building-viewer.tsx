import { FC } from "react"; //to define a component
import { Button } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
export const BuildingViewer: FC = () => {

    const [state,dispatch] = useAppContext()
    const {building} = state;

    const onCloseBuilding = () => {
        dispatch({ type: "CLOSE_BUILDING" });

    }

    if (!building) {
        return <Navigate to={"/map"} />
    }

  return (
    <>
      <h1>hello building viewer!</h1>
      <Button onClick= {onCloseBuilding}>Close building</Button>
    </>
  );
}; //FC type - functional component
