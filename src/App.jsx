import React from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

import LoginContainter from "./pages/Login/LoginContainer";
import RegisterContainer from "./pages/Register/RegisterContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Switch>
          <Route path="/register" component={RegisterContainer} exact />
          <Route path="/login" component={LoginContainter} exact />
          <Route path="/" component={RegisterContainer} exact />
        </Switch>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
