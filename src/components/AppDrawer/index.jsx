import * as React from "react";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import FilterSection from "../FilterSection";
import { Typography } from "@mui/material";
import { useAppContext } from "../../context/AppContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `100% `,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppDrawer() {
  const [open, setOpen] = React.useState(true);
  const [appBarHeight, setAppBarHeight] = React.useState(0);
  const appBarRef = React.useRef(null);

  const {
    client: { clientCode },
  } = useAppContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  React.useLayoutEffect(() => {
    const handleResize = () => setAppBarHeight(appBarRef.current.clientHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [appBarRef, clientCode]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white" }}
        ref={appBarRef}
      >
        <Toolbar sx={{ height: "auto" }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              zIndex: 20,
              color: "black",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {Number(clientCode) > 0 ? (
            <FilterSection />
          ) : (
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
              color={"black"}
            >
              Client Code Not found
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Main open={open} sx={{ padding: 0, margin: "20px" }}>
        <DrawerHeader
          sx={{
            height: appBarHeight,
          }}
        />
        <Outlet />
      </Main>
    </Box>
  );
}
