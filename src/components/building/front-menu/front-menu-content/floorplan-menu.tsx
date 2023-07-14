import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-context.css";

export const FloorplanMenu: FC = () => {
  const [state, dispatch] = useAppContext();

  return <div>Floorplans</div>;
};
