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
import { getSelfInfo } from "./store/generalSlice";
import { CircularProgress, Grid } from "@material-ui/core";
import Forgot from "./components/Forgot/Forgot";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import SnackMessage from "./components/Notifier/SnackMessage/SnackMessage";
import Notifier from "./components/Notifier/Notifier";

const useStyles = makeStyles({
  Grid: {
    width: "100vw",
    height: "100vh",
  },
});

function App() {
  const classes = useStyles();
  const { isAuth, isLoading } = useSelector((state) => state.general);
  const { isInfoMissing } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const [content, setContent] = useState(<CircularProgress />);

  useEffect(() => {
    dispatch(getSelfInfo());
  }, [dispatch]);

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
          <Redirect exact from="/strangers" to="/" />
          <Redirect from="/login" to="/" />
          <Route path="/" component={Main} />
        </Switch>
      );
    } else {
      setContent(
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/forgot" component={Forgot} exact />
          <Route path="/reset" component={UpdatePassword} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    }
  }, [isAuth, isLoading, classes.Grid]);

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
