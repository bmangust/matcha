import React from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";

import { Button, TextField } from "@material-ui/core";
import { useStyles } from "../../style";

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
    <form className="screen__center">
      <TextField
        className={classes.Margin}
        type="email"
        label="Email"
        variant="outlined"
        value={props.email}
        onChange={(event) => props.changeEmail(event.target.value)}
        required
      />
      <TextField
        className={classes.Margin}
        type="password"
        label="Password"
        variant="outlined"
        value={props.password}
        onChange={(event) => props.changePassword(event.target.value)}
        required
      />
      <Button
        className={classes.Margin}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        onClick={(e) => onLoginHandler(e)}
      >
        Login
      </Button>
      <Button
        className={classes.Margin}
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => onReginsterHandler(history)}
      >
        Register
      </Button>
    </form>
  );
};

export default Login;
