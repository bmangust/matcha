import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, withRouter, Link } from "react-router-dom";
import { logout } from "../../store/generalSlice";
import {
  setCompanion,
  setHeader,
  setParent,
  setSelectedTab,
} from "../../store/UISlice";

import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import {
  Search,
  Message,
  Settings,
  ExitToApp,
  People,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { backgroundColor } from "../../theme";

import Strangers from "../../pages/Strangers/Strangers";
import Profile from "../../pages/Profile/Profile";
import Header from "../../components/Header/Header";
import Chat from "../Chat/Chat";
import { useNotifications } from "../../hooks/useNotifications";
import { useWS } from "../../hooks/useWS.hook";
import { setChat } from "../../store/chatSlice";
import { useChat } from "../../hooks/useChat.hook";
import Social from "../Social/Social";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  selectedTab: {
    color: "red",
  },
  AppBar: {
    position: "fixed",
    left: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 500,
  },
  View: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Max: {
    width: "100%",
    height: "100vh",
  },
  Container: {
    paddingTop: "70px",
    backgroundColor: backgroundColor.background,
    maxWidth: "100vw",
    width: "100%",
  },
});

const tabs = [
  {
    index: 0,
    label: "Strangers",
    icon: <Search />,
    content: <Strangers />,
    url: "/",
  },
  {
    index: 1,
    label: "Chat",
    icon: <Message />,
    content: <Chat />,
    url: "/chat",
  },
  {
    index: 2,
    label: "Social",
    icon: <People />,
    content: <Social />,
    url: "/social",
  },
  {
    index: 3,
    label: "Settings",
    icon: <Settings />,
    content: <Profile />,
    url: "/profile",
  },
  {
    index: 4,
    label: "Logout",
    icon: <ExitToApp />,
    content: null,
    url: "/logout",
  },
];

const Main = () => {
  const { notif } = useNotifications();
  const { header, selectedTab, companion } = useSelector((state) => state.UI);
  const { isLoading } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { getChatsInfo } = useChat();
  useWS();

  const handleChange = async (e, url) => {
    if (url === "/logout") {
      dispatch(logout(notif));
      history.push("/login");
      return;
    }
    const tab = tabs.find((e) => e.url === url);
    dispatch(setHeader({ header: tab.label }));
    dispatch(setCompanion({ companion: null }));
    dispatch(setSelectedTab({ selectedTab: tab }));
    dispatch(setChat(null));
    dispatch(setParent({ parent: url.substr(1) }));
    history.push(url);
  };

  useEffect(() => {
    getChatsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedTabs = tabs.map((el) => {
    return (
      <Tab
        icon={el.icon}
        value={el.url}
        key={el.index}
        component={Link}
        to={el.url}
      />
    );
  });

  return (
    <Container className={classes.root}>
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.Max}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={1}
          className={classes.Container}
        >
          <Header header={companion?.username || header || tabs[0].label} />
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/profile" component={Profile} />
            <Route path="/social" component={Social} />
            <Route path="/" component={Strangers} />
          </Switch>
          <AppBar className={classes.AppBar} position="static">
            <Tabs
              value={selectedTab?.url || "/"}
              centered
              onChange={handleChange}
            >
              {renderedTabs}
            </Tabs>
          </AppBar>
        </Grid>
      )}
    </Container>
  );
};

export default withRouter(Main);
