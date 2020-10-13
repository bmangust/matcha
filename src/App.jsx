import React from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

import LoginContainter from "./pages/Login/LoginContainer";
import RegisterContainer from "./pages/Register/RegisterContainer";
import Main from "./containers/Main/Main";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <React.Fragment>
          <CssBaseline />
          <Switch>
            <Route path="/register" component={RegisterContainer} exact />
            <Route path="/login" component={LoginContainter} exact />
            <Route path="/main" component={Main} exact />
            <Route path="/" component={RegisterContainer} exact />
          </Switch>
        </React.Fragment>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
