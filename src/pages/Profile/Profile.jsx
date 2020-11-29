import { Tabs, Tab, Grid, makeStyles } from "@material-ui/core";
import React, { createContext, useState } from "react";
import { connect } from "react-redux";
import TabPanel from "../../containers/TabPanel/TabPanel";
import AvatarContainer from "../../components/Avatar/AvatarContainer";
import { backgroundColor, borderRadius, primaryColor } from "../../theme";
import UpdateInfo from "../../containers/UpdateInfo/UpdateInfo";
import Gallery from "../../components/Gallery/Gallery";
import Banned from "../../components/Banned/Banned";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#ffffff00",
    border: `1px solid ${primaryColor.dark}`,
    bottom: 0,
    height: "100%",
    borderRadius: borderRadius,
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
});

const buttons = [
  {
    id: 0,
    text: "Info",
    component: <UpdateInfo />,
  },
  {
    id: 1,
    text: "Gallery",
    component: <Gallery />,
  },
  {
    id: 2,
    text: "Banned",
    component: <Banned />,
  },
];
export const TabContext = createContext(buttons[0].id);

const Profile = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const selectTabHandler = (e, next) => {
    setCurrentTab(next);
  };

  const tabs = buttons.map((el, index) => (
    <Tab disableRipple label={el.text} key={index} />
  ));

  const getPanel = (index) => (
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
        <AvatarContainer />
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

const mapStateToProps = (state) => ({
  id: state.general.id,
  images: state.general.images,
});

export default connect(mapStateToProps)(Profile);
