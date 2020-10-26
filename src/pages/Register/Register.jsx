import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles, Grid, CircularProgress } from "@material-ui/core";
import {
  changeEmail,
  changeUsername,
  changePassword,
  changeConfirmPassword,
  changeEmailValid,
  changeUsernameValid,
  changePasswordValid,
  changeConfirmValid,
  register,
} from "./registerSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form/Form";

const useStyles = makeStyles({
  Grid: {
    height: "100vh",
  },
  Form: {
    width: "100%",
  },
  Button: {
    margin: "8px",
  },
  List: {
    width: "100%",
  },
  Buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const {
    email,
    username,
    password,
    confirm,

    emailValid,
    usernameValid,
    passwordValid,
    confirmValid,
  } = useSelector((state) => state.register);
  const [formValid, setFormValid] = useState(false);
  const { isLoading } = useSelector((state) => state.general);

  const onLoginHandler = () => {
    history.push("/login");
  };

  useEffect(() => {
    const formValid =
      emailValid && usernameValid && passwordValid && confirmValid;
    setFormValid(formValid);
  }, [emailValid, usernameValid, passwordValid, confirmValid]);

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, enqueueSnackbar, history));
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      required: true,
      onValidate: (isValid) => {
        dispatch(changeUsernameValid(isValid));
      },
      onChange: (e) => {
        dispatch(changeUsername(e.target.value));
      },
      rules: {
        helperText:
          "Use letters, numbers or symbols ., %, _, -, +. Min length 3",
        rule: {
          minLength: 3,
          maxLength: 20,
          regex: /^[\w%-+.]+$/,
        },
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      required: true,
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
    {
      name: "confirm",
      type: "password",
      label: "Confirm",
      value: confirm,
      required: true,
      onValidate: (isValid) => {
        dispatch(changeConfirmValid(isValid));
      },
      onChange: (e) => {
        dispatch(changeConfirmPassword(e.target.value));
      },
      rules: {
        helperText: "Confirm and password does not match",
        rule: {
          minLength: 3,
          maxLength: 20,
          regex: new RegExp(`^${password}$`),
        },
      },
    },
  ];

  const buttons = [
    {
      variant: "contained",
      type: "submit",
      text: "Sign up",
      disabled: !formValid,
      onClick: (e) => {
        onRegisterHandler(e);
      },
    },
    {
      text: "Already a member?",
      onClick: onLoginHandler,
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

export default Register;
