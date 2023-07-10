import { FC } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getSidebarTools } from "./sidebar-tools";
import { useAppContext } from "../../../middleware/context-provider";

export const BuildingSidebar: FC<{
  open: boolean;
  onToggleMenu: () => void;
}> = (props) => {
  const { open, onToggleMenu } = props;
  const [state, dispatch] = useAppContext();

  const tools = getSidebarTools(state, dispatch, onToggleMenu);

  return (
    <List>
      {tools.map((tool) => (
        <ListItem
          onClick={tool.action}
          key={tool.name}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {tool.icon}
            </ListItemIcon>
            <ListItemText primary={tool.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
