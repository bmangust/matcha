import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, AppBar, Tabs, Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { Search, Message, Settings } from "@material-ui/icons";
import Strangers from "../../pages/Strangers/Strangers";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}

const useStyles = makeStyles({
  selectedTab: {
    color: "red",
  },
  AppBar: {
    position: "fixed",
    left: 0,
    bottom: 0,
  },
  View: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    content: <div>Settings</div>,
  },
];

const Main = (props) => {
  const classes = useStyles();
  const [selectedTab, setValue] = React.useState(0);
  const handleChange = (event, nextValue) => {
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
    <Paper>
      <SwipeableViews
        enableMouseEvents
        index={selectedTab}
        onChangeIndex={handleChangeIndex}
      >
        {tabPanels}
      </SwipeableViews>
      <AppBar className={classes.AppBar} position="static">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          {renderedTabs}
        </Tabs>
      </AppBar>
    </Paper>
  );
};

export default Main;
