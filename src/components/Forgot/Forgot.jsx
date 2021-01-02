import { Grid } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import { useStyles } from "../../style";
import Form from "../Form/Form";

const Forgot = () => {
  const classes = useStyles();
  const { notif } = useNotifications();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const history = useHistory();

  const updatePasswordRequest = (e) => {
    e.preventDefault();
    try {
      api.post("/reset", { email });
      notif("Check your email", "info");
    } catch (e) {
      notif("Server error, please try again later", "error");
    }
  };

  const backToLogin = () => {
    history.push("/login");
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      onValidate: (isValid) => {
        setEmailValid(isValid);
      },
      onChange: (e) => {
        setEmail(e.target.value);
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
  ];

  const buttons = [
    {
      component: "button",
      variant: "contained",
      type: "submit",
      text: "send restore password link",
      size: "large",
      disabled: !emailValid,
      onClick: updatePasswordRequest,
    },
    {
      component: "button",
      text: "back to login",
      size: "large",
      onClick: backToLogin,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.SingleForm}
    >
      <Form className={classes.Form} inputs={inputs} buttons={buttons} />
    </Grid>
  );
};

export default Forgot;
