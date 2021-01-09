import { Tabs, Tab, Grid, makeStyles } from "@material-ui/core";
import React, { createContext, useState } from "react";
import TabPanel from "../../containers/TabPanel/TabPanel";
import AvatarContainer from "../../components/Avatar/AvatarContainer";
import {
  backgroundColor,
  borderRadius,
  primaryColor,
  secondaryColor,
} from "../../theme";
import Gallery from "../../components/Gallery/Gallery";
import Banned from "../../components/Banned/Banned";
import Settings from "../../components/Settings/Settings";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#ffffff00",
    border: `1px solid ${primaryColor.dark}`,
    bottom: 0,
    height: "100%",
    borderRadius: borderRadius,
    "&:hover,&:focus": {
      borderColor: secondaryColor.main,
    },
  },
  TabPanel: {
    backgroundColor: backgroundColor.foreground,
    borderRadius: borderRadius,
    padding: "5px",
  },
  Profile: {
    minHeight: "100vh",
    padding: "30px",
    paddingBlockEnd: "60px",
  },
  Tab: {
    "&:hover,&:focus": {
      color: secondaryColor.main,
    },
  },
});

const buttons = [
  {
    id: 0,
    text: "Gallery",
    component: <Gallery />,
  },
  {
    id: 1,
    text: "Banned",
    component: <Banned />,
  },
  {
    id: 2,
    text: "Settings",
    component: <Settings />,
  },
];
export const TabContext = createContext(buttons[0].id);

const Profile = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const { images } = useSelector((state) => state.general);

  const selectTabHandler = (e, next) => {
    setCurrentTab(next);
  };

  const tabs = buttons.map((el, index) => (
    <Tab className={classes.Tab} disableRipple label={el.text} key={index} />
  ));

  const getPanel = () => (
    <TabPanel
      value={currentTab}
      index={buttons[currentTab].id}
      key={buttons[currentTab].id}
    >
      {buttons[currentTab].component}
    </TabPanel>
  );

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.Profile}
    >
      <TabContext.Provider value={currentTab}>
        <AvatarContainer loadingDisabled={images && images.length >= 5} />
        <Tabs
          classes={{ root: classes.TabPanel, indicator: classes.indicator }}
          value={currentTab}
          onChange={selectTabHandler}
        >
          {tabs}
        </Tabs>
        {getPanel()}
      </TabContext.Provider>
    </Grid>
  );
};

export default Profile;
