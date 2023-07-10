import { Button, Card, CardContent } from "@mui/material";
import { FC } from "react";
import "./building-front-menu.css";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";

export type FrontMenuMode = "BuildingInfo"; // if mode == properties, display properties etc...

export const BuildingFrontMenu: FC<{
  mode: FrontMenuMode;
  open: boolean;
  onToggleMenu: (active: boolean) => void;
}> = ({ mode, open, onToggleMenu }) => {
  if (!open) {
    return <></>;
  }

  const content = new Map<FrontMenuMode, any>();
  const buildingInfoMenu = <BuildingInfoMenu onToggleMenu={onToggleMenu} />;
  content.set("BuildingInfo", buildingInfoMenu);

  const titles = {
    BuildingInfo: "Building Information",
  };

  const title = titles[mode];

  return (
    <Card className="front-menu">
      <CardContent>
        <div className="front-menu-header">
          <h2>{title}</h2>
          <Button onClick={() => onToggleMenu(false)}>
            <CloseIcon />
          </Button>
        </div>
        <div className="front-menu-content">{content.get(mode)}</div>
      </CardContent>
    </Card>
  );
};