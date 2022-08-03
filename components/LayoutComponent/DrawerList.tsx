import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Home, BookRounded, Add } from "@mui/icons-material";
import React from "react";
import { NextRouter, useRouter } from "next/router";
import {
  addNewWordTitle,
  glossaryPage,
  homePage,
} from "../../services/strings";

type Props = {
  onListItemClicked: any;
};

const DrawerList = (props: Props) => {
  const router: NextRouter = useRouter();

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding style={{ width: "70vw" }}>
            <ListItemButton
              onClick={() => {
                router.push("/");
                props.onListItemClicked();
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={homePage} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ width: "50vw" }}>
            <ListItemButton
              onClick={() => {
                router.push("/glossary");
                props.onListItemClicked();
              }}
            >
              <ListItemIcon>
                <BookRounded />
              </ListItemIcon>
              <ListItemText primary={glossaryPage} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ width: "50vw" }}>
            <ListItemButton
              onClick={() => {
                router.push("/addnew");
                props.onListItemClicked();
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={"புதிய சொற்களைச் சேர்க்கவும்"} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
};

export default DrawerList;
