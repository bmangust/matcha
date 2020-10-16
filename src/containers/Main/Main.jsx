import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, withRouter, Link } from "react-router-dom";
import { logout } from "../../store/generalSlice";
import { handleBack, setSelectedTab } from "../../store/UISlice";

import {
  AppBar,
  Tabs,
  Tab,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Search, Message, Settings, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { backgroundColor } from "../../theme";

import Strangers from "../../pages/Strangers/Strangers";
import Profile from "../../pages/Profile/Profile";
import Header from "../../components/Header/Header";
import Chat from "../Chat/Chat";

import { useSnackbar } from "notistack";

const useStyles = makeStyles({
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
    backgroundColor: backgroundColor.background,
    maxWidth: "100vw",
  },
  Header: {
    paddingTop: "30px",
    position: "static",
    top: 0,
    left: 0,
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
    label: "Settings",
    icon: <Settings />,
    content: <Profile />,
    url: "/profile",
  },
  {
    index: 3,
    label: "Logout",
    icon: <ExitToApp />,
    content: null,
    url: "/logout",
  },
];

const Main = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { header, selectedTab, companion } = useSelector((state) => state.UI);
  const isLoading = useSelector((state) => state.general.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleChange = async (e, url) => {
    if (url === "/logout") {
      dispatch(logout(enqueueSnackbar));
      history.push("/login");
      return;
    }
    const tab = tabs.find((e) => e.url === url);
    dispatch(setSelectedTab({ selectedTab: tab }));
    history.push(url);
  };

  const handleBackButton = () => {
    dispatch(handleBack(history));
  };

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
    <Container>
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
          <Grid className={classes.Header}>
            <Header
              showBackButton={true}
              header={header || tabs[0].label}
              handleBack={handleBackButton}
            />
          </Grid>
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/profile" component={Profile} />
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
