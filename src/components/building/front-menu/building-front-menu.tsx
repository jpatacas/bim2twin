import { Button, Card, CardContent } from "@mui/material";
import { FC } from "react";
import "./building-front-menu.css";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { FrontMenuMode } from "../types";
import { ModelListMenu } from "./front-menu-content/model-list-menu";
import { PropertiesMenu } from "./front-menu-content/properties-menu";
import { FloorplanMenu } from "./front-menu-content/floorplan-menu";
import { EnergyMenu } from "./front-menu-content/energy-menu";
import { DocumentsMenu } from "./front-menu-content/documents-menu";


//export type FrontMenuMode = "BuildingInfo"; // if mode == properties, display properties etc...

export const BuildingFrontMenu: FC<{
  mode: FrontMenuMode;
  open: boolean;
  onToggleMenu: () => void;
}> = ({ mode, open, onToggleMenu }) => {
  if (!open) {
    return <></>;
  }

  const content = new Map<FrontMenuMode, any>();
  content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} />);
  content.set("ModelList", <ModelListMenu/>);
  content.set("Properties", <PropertiesMenu />);
  content.set("Floorplans", <FloorplanMenu />);
  content.set("Energy", <EnergyMenu/>);
  content.set("Documents", <DocumentsMenu/>);

  const titles = {
    BuildingInfo: "Building Information",
    ModelList: "Model List",
    Properties: "Properties",
    Floorplans: "Floorplans",
    Energy: "Energy",
    Documents: "Documents"
  };

  const title = titles[mode];

  return (
    <Card className="front-menu bottom-right">
      <CardContent>
        <div className="front-menu-header">
          <h2>{title}</h2>
          <Button onClick={() => onToggleMenu()}>
            <CloseIcon />
          </Button>
        </div>
        <div className="front-menu-content">{content.get(mode)}</div>
      </CardContent>
    </Card>
  );
};