import { Tabs, Tab, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import TabPanel from "../../containers/TabPanel/TabPanel";
import AvatarContainer from "../../components/Avatar/AvatarContainer";
import { backgroundColor, primaryColor } from "../../theme";
import UpdateInfo from "../../containers/UpdateInfo/UpdateInfo";
import Gallery from "../../components/Gallery/Gallery";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#ffffff00",
    border: `1px solid ${primaryColor.dark}`,
    bottom: 0,
    height: "100%",
    borderRadius: "30px",
  },
  TabPanel: {
    backgroundColor: backgroundColor.foreground,
    borderRadius: "30px",
    padding: "5px",
  },
  Profile: {
    minHeight: "100vh",
    padding: "30px",
    paddingBlockEnd: "40px",
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
    component: <div>favorites</div>,
  },
];

const Profile = (props) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

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
