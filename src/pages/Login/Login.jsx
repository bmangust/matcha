import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles, CircularProgress, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  changeEmail,
  changeEmailValid,
  changePassword,
  changePasswordValid,
} from "./loginSlice";
import { auth } from "../../store/generalSlice";
import Form from "../../components/Form/Form";

const useStyles = makeStyles({
  Grid: {
    height: "100vh",
  },
});

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, password, emailValid, passwordValid } = useSelector(
    (state) => state.login
  );
  const { isLoading } = useSelector((state) => state.general);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    const formValid = emailValid && passwordValid;
    setFormValid(formValid);
  }, [emailValid, passwordValid]);

  const onRegisterHandler = () => {
    history.push("register");
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    dispatch(auth(email, password, enqueueSnackbar));
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      onValidate: (isValid) => {
        dispatch(changeEmailValid(isValid));
      },
      onChange: (e) => {
        dispatch(changeEmail(e.target.value));
      },
      rules: {
        helperText: "invalid email",
        rule: {
          minLength: 3,
          maxLength: 40,
          regex: /^([\w%+-.]+)@([\w-]+\.)+([\w]{2,})$/i,
        },
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      required: true,
      onValidate: (isValid) => {
        dispatch(changePasswordValid(isValid));
      },
      onChange: (e) => {
        dispatch(changePassword(e.target.value));
      },
      rules: {
        helperText:
          "Use at least one lower- and uppercase letter, number and symbol. Min length 4",
        rule: {
          minLength: 4,
          maxLength: 20,
          regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{4,}$/,
        },
      },
    },
  ];

  const buttons = [
    {
      variant: "contained",
      type: "submit",
      text: "Sign in",
      disabled: !formValid,
      onClick: (e) => {
        onLoginHandler(e);
      },
    },
    {
      text: "Not yet with us?",
      onClick: onRegisterHandler,
    },
  ];

  return (
    <Grid container justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.Grid}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Form inputs={inputs} buttons={buttons} />
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
