import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./containers/Main/Main";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";

function App() {
  const { isAuth } = useSelector((state) => state.general);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <>
          <CssBaseline />
          {isAuth ? (
            <Switch>
              <Redirect exact from="/strangers" to="/" />
              <Redirect from="/login" to="/" />
              <Route path="/" component={Main} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          )}
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
