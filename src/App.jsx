import React, { useEffect, useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";

import { checkAuth } from "./store/generalSlice";
import AdditionalInfo from "./pages/AdditionalInfo/AdditionalInfo";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./containers/Main/Main";
import Forgot from "./components/Forgot/Forgot";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import SnackMessage from "./components/Notifier/SnackMessage/SnackMessage";
import Notifier from "./components/Notifier/Notifier";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

const useStyles = makeStyles({
  Grid: {
    width: "100vw",
    height: "100vh",
  },
  root: {
    marginBottom: 40,
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.general);
  const { isInfoMissing } = useSelector((state) => state.UI);
  const [content, setContent] = useState(<CircularProgress />);

  useEffect(() => {
    dispatch(checkAuth());
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
          <Route path="/add" component={AdditionalInfo} exact />
          <Redirect from="/" to="/add" />
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
          <Route path="/email/verify" component={VerifyEmail} exact />
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
        classes={{ containerRoot: classes.root }}
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
