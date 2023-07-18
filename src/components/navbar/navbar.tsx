import { FC } from "react";
import { Outlet } from "react-router-dom";
import { getAppBar } from "../building/side-menu/mui-utils";
import { Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar: FC<{
  open: boolean;
  onOpen: () => void;
  width: number;
}> = (props) => {
  const { open, onOpen, width } = props;

  const Appbar = getAppBar(width);

  return (
    <>
      <Appbar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            BIM2TWIN
          </Typography>
        </Toolbar>
      </Appbar>
      <Outlet />
    </>
  );
};
