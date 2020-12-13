import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { api } from "../../axios";
import queryString from "query-string";
import {
  changePassword,
  changePasswordValid,
  changeConfirmPassword,
  changeConfirmValid,
} from "../../pages/Register/registerSlice";
import Form from "../Form/Form";
import { Grid } from "@material-ui/core";
import { useNotifications } from "../../hooks/useNotifications";
import { useStyles } from "../../style";

const UpdatePassword = (props) => {
  const classes = useStyles();
  const { password, passwordValid, confirm, confirmValid } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const notif = useNotifications();
  const formValid = passwordValid && confirmValid;
  const queryParams = queryString.parse(location.search);

  const checkValidity = async (k) => {
    try {
      const res = await api("/reset", { params: { k } });
      if (!res.data.status)
        notif(`${res.data.data}. Try request link once again`, "warning");
    } catch (e) {
      notif("Server error", "error");
    }
  };

  const updatePasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/reset", { password });
      if (res.data.status) notif("New password successfully saved", "success");
      else notif(res.data.data, "success");
    } catch (e) {
      notif("Server error", "error");
    }
  };

  useEffect(() => {
    checkValidity(queryParams.k);
  }, []);

  const inputs = [
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
      component: "button",
      type: "submit",
      text: "Save new password",
      size: "large",
      disabled: !formValid,
      onClick: updatePasswordRequest,
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
      <Form inputs={inputs} buttons={buttons} />
    </Grid>
  );
};

export default UpdatePassword;
