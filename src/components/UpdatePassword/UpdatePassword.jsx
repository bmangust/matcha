import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../axios";
import {
  changePassword,
  changePasswordValid,
  changeConfirmPassword,
  changeConfirmValid,
} from "../../pages/Register/registerSlice";
import Form from "../Form/Form";

const UpdatePassword = (props) => {
  const { password, passwordValid, confirm, confirmValid } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();
  const formValid = passwordValid && confirmValid;

  const updatePasswordRequest = async () => {
    const res = await api.put("/reset", { password });
    console.log(res.data);
    if (res.data.status) {
    }
  };

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
      text: "update personal info",
      size: "large",
      disabled: !formValid,
      onClick: updatePasswordRequest,
    },
  ];

  return <Form inputs={inputs} buttons={buttons} />;
};

export default UpdatePassword;
