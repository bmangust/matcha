import { Tabs, Tab, Container, makeStyles, Fab } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { api } from "../../axios";
import TabPanel from "../../containers/TabPanel/TabPanel";
import AvatarContainer from "../../components/Avatar/AvatarContainer";
import { backgroundColor, primaryColor } from "../../theme";
import UpdateInfo from "../../containers/UpdateInfo/UpdateInfo";

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
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const buttons = [
  {
    text: "Info",
    component: <UpdateInfo />,
  },
  {
    text: "Visitors",
    component: <div>visitors</div>,
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

  const getUsers = async () => {
    const res = await api.get("strangers");
    console.log(res.data);
  };

  return (
    <Container className={classes.Profile}>
      <AvatarContainer />
      <Tabs
        classes={{ root: classes.TabPanel, indicator: classes.indicator }}
        value={currentTab}
        onChange={selectTabHandler}
      >
        {tabs}
      </Tabs>
      {tabPanels}
      <Fab onClick={getUsers}>GET</Fab>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  id: state.general.id,
  images: state.general.images,
});

export default connect(mapStateToProps)(Profile);
