import { Tabs, Tab, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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
    text: "Info",
    component: <UpdateInfo />,
  },
  {
    text: "Gallery",
    component: <Gallery />,
  },
  {
    text: "Favorites",
    component: <Banned />,
  },
];

const Profile = (props) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const selectTabHandler = (e, next) => {
    setCurrentTab(next);
  };

  const tabs = buttons.map((el, index) => (
    <Tab disableRipple label={el.text} key={index} />
  ));

  const tabPanels = buttons.map((el, index) => (
    <TabPanel value={currentTab} index={index} key={index}>
      {el.component}
    </TabPanel>
  ));

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.Profile}
    >
      <AvatarContainer />
      <Tabs
        classes={{ root: classes.TabPanel, indicator: classes.indicator }}
        value={currentTab}
        onChange={selectTabHandler}
      >
        {tabs}
      </Tabs>
      {tabPanels}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  id: state.general.id,
  images: state.general.images,
});

export default connect(mapStateToProps)(Profile);
