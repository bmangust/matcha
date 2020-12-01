import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import Form from "../Form/Form";

const useStyles = makeStyles({
  FullWidth: {
    width: "70vw",
    height: "100vh",
    margin: "0 auto",
  },
});

const Forgot = () => {
  const classes = useStyles();
  const notif = useNotifications();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const updatePasswordRequest = (e) => {
    e.preventDefault();
    try {
      api.post("/reset", { email });
      notif("Check your email", "info");
    } catch (e) {
      notif("Server error, please try again later", "error");
    }
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
      type: "submit",
      text: "send restore password link",
      size: "large",
      disabled: !emailValid,
      onClick: updatePasswordRequest,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.FullWidth}
    >
      <Form className={classes.Form} inputs={inputs} buttons={buttons} />
    </Grid>
  );
};

export default Forgot;
