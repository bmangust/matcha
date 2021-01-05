import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./containers/Main/Main";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import AdditionalInfo from "./pages/AdditionalInfo/AdditionalInfo";
import { checkAuth, setNewState } from "./store/generalSlice";
import { CircularProgress, Grid } from "@material-ui/core";
import Forgot from "./components/Forgot/Forgot";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import SnackMessage from "./components/Notifier/SnackMessage/SnackMessage";
import Notifier from "./components/Notifier/Notifier";
import { useNotifications } from "./hooks/useNotifications";
import { getLocationByIp } from "./hooks/useGPS.hook";
import {
  changeUseLocation,
  updateInfo,
} from "./pages/AdditionalInfo/additionalSlice";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

const useStyles = makeStyles({
  Grid: {
    width: "100vw",
    height: "100vh",
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showPrompt } = useNotifications();
  const { isAuth, isLoading } = useSelector((state) => state.general);
  const { isInfoMissing } = useSelector((state) => state.UI);
  const [content, setContent] = useState(<CircularProgress />);

  useEffect(() => {
    dispatch(checkAuth());
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        console.log(result);
        if (result.state === "granted") {
          dispatch(setNewState({ useLocation: true }));
          dispatch(changeUseLocation(true));
          dispatch(updateInfo());
        } else if (result.state === "prompt") {
          showPrompt(
            "We use geolocation on this site to provide better results and optimize your experience. Allow using GPS?"
          );
        } else {
          dispatch(setNewState({ useLocation: false }));
          dispatch(changeUseLocation(false));
          dispatch(updateInfo());
          getLocationByIp();
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      setContent(
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.Grid}
        >
          <CircularProgress />
        </Grid>
      );
    } else if (isAuth && isInfoMissing) {
      setContent(
        <Switch>
          <Redirect from="/login" to="/add" />
          <Route path="/add" component={AdditionalInfo} exact />
        </Switch>
      );
    } else if (isAuth) {
      setContent(
        <Switch>
          <Route path="/reset" component={UpdatePassword} exact />
          <Route path="/email/verify" component={VerifyEmail} exact />
          <Redirect exact from="/strangers" to="/" />
          <Redirect from="/login" to="/" />
          <Route path="/" component={Main} />
        </Switch>
      );
    } else {
      setContent(
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/forgot" component={Forgot} exact />
          <Route path="/reset" component={UpdatePassword} exact />
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    }
  }, [isAuth, isLoading, classes.Grid, isInfoMissing]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        content={(key) => <SnackMessage id={key} />}
      >
        <>
          <CssBaseline />
          {content}
          <Notifier />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
