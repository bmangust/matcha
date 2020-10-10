import React from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";

import {
  Button,
  TextField,
  Container,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { theme } from "../../theme";

const useStyles = makeStyles({
  Input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  Form: {
    width: "50%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    margin: "8px",
  },
  List: {
    width: "100%",
  },
  ListItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const onReginsterHandler = (history) => {
    history.push("register");
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: props.email,
      password: props.password,
    };
    const response = await api.post("signin", body);
    console.log(response.data);

    if (response.data.status === true) {
      props.saveNewState(response.data.data);
      history.push("main");
    } else {
      // show notification on failure
    }
  };

  return (
    <Container>
      <form className={classes.Form}>
        <List className={classes.List}>
          <ListItem className={classes.ListItem}>
            <TextField
              type="email"
              label="Email"
              value={props.email}
              onChange={(event) => props.changeEmail(event.target.value)}
              required
            />
          </ListItem>
          <ListItem className={classes.ListItem}>
            <TextField
              type="password"
              label="Password"
              value={props.password}
              onChange={(event) => props.changePassword(event.target.value)}
              required
            />
          </ListItem>
          <ListItem className={classes.ListItem}>
            <Button
              className={classes.Button}
              type="submit"
              onClick={(e) => onLoginHandler(e)}
            >
              Login
            </Button>
            <Button
              className={classes.Button}
              onClick={() => onReginsterHandler(history)}
            >
              Register
            </Button>
          </ListItem>
        </List>
      </form>
    </Container>
  );
};

export default Login;
