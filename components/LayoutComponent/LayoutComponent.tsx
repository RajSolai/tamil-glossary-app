import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { Typography, Button, IconButton, Fab } from "@mui/material";
import { Menu, Add } from "@mui/icons-material";
import React, { CSSProperties, ReactNode, useState } from "react";
import DrawerList from "./DrawerList";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "../../services/theme";
import { appTitle, loginText } from "../../services/strings";
import { NextRouter, useRouter } from "next/router";
import { NextComponentType } from "next";

type Props = {
  children: ReactNode;
};

export const LayoutComponent = (props: Props) => {
  const router: NextRouter = useRouter();
  const [isOpen, toggleDrawer] = useState<boolean>(false);

  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <>
            <Drawer
              anchor={"left"}
              open={isOpen}
              onClose={() => toggleDrawer(false)}
            >
              <DrawerList onListItemClicked={() => toggleDrawer(false)} />
            </Drawer>
          </>
          <AppBar position="static" style={{ backgroundColor: "#A85CF9" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleDrawer(true)}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {appTitle}
              </Typography>
              <Button color="inherit" onClick={() => router.push("/login")}>
                {loginText}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <div>
          <ThemeProvider theme={customTheme}>
            <>{props.children}</>
          </ThemeProvider>
        </div>
      </>
    </>
  );
};
