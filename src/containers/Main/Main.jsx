import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, AppBar, Tabs, Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { Search, Message, Settings, ExitToApp } from "@material-ui/icons";
import Strangers from "../../pages/Strangers/Strangers";
import { api } from "../../axios";
import Profile from "../../pages/Profile/Profile";
import TabPanel from "../TabPanel/TabPanel";
import { backgroundColor } from "../../theme";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  selectedTab: {
    color: "red",
  },
  AppBar: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    bottom: 0,
  },
  View: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Paper: {
    borderRadius: 0,
    backgroundColor: backgroundColor.background,
  },
});
const tabs = [
  {
    index: 0,
    label: "Search",
    icon: <Search />,
    content: <Strangers />,
  },
  {
    index: 1,
    label: "Chat",
    icon: <Message />,
    content: <div>Chat</div>,
  },
  {
    index: 2,
    label: "Settings",
    icon: <Settings />,
    content: <Profile />,
  },
];

const Main = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [selectedTab, setValue] = React.useState(0);
  const handleChange = async (event, nextValue) => {
    if (nextValue === 3) {
      try {
        api.delete("signout");
        history.push("/login");
      } catch (e) {
        console.log(e);
      }
      return;
    }
    setValue(nextValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const renderedTabs = tabs.map((el) => <Tab icon={el.icon} key={el.index} />);
  const tabPanels = tabs.map((el) => (
    <TabPanel value={selectedTab} index={el.index} key={el.label + el.index}>
      <div className={classes.View}>{el.content}</div>
    </TabPanel>
  ));

  return (
    <Paper className={classes.Paper}>
      {/* <SwipeableViews
        enableMouseEvents
        index={selectedTab}
        onChangeIndex={handleChangeIndex}
      > */}
      {tabPanels}
      {/* </SwipeableViews> */}
      <AppBar className={classes.AppBar} position="static">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          {renderedTabs}
          <Tab icon={<ExitToApp />} key="logout" />
        </Tabs>
      </AppBar>
    </Paper>
  );
};

export default Main;
