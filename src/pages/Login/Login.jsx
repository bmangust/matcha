import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
  changeEmail,
  changeEmailValid,
  changePassword,
  changePasswordValid,
} from "./loginSlice";
import { auth } from "../../store/generalSlice";
import Form from "../../components/Form/Form";
import { useNotifications } from "../../hooks/useNotifications";
import { useStyles } from "../../style";

const Login = () => {
  const { notif } = useNotifications();
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
    dispatch(auth(email, password, notif));
  };

  const inputs = [
    {
      name: "login",
      type: "text",
      label: "Login",
      value: email,
      placeholder: "Enter username or email",
      onValidate: (isValid) => {
        dispatch(changeEmailValid(isValid));
      },
      onChange: (e) => {
        dispatch(changeEmail(e.target.value));
      },
      rules: {
        helperText: "invalid login",
        rule: {
          minLength: 3,
          maxLength: 40,
          regex: /^(([\w%+-.]+)@([\w-]+\.)+([\w]{2,}))|([\w%-+.]+)$/i,
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

  const handleForgot = () => {
    history.push("/forgot");
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.SingleForm}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Form inputs={inputs} buttons={buttons} />
          <Button
            variant="text"
            color="primary"
            classes={{ label: classes.label }}
            onClick={handleForgot}
          >
            Forgot password?
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Login;
