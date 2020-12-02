import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import { api } from "../../axios";
import queryString from "query-string";
import {
  changePassword,
  changePasswordValid,
  changeConfirmPassword,
  changeConfirmValid,
} from "../../pages/Register/registerSlice";
import Form from "../Form/Form";

const checkValidity = async (k) => {
  try {
    await api("/reset", { params: { k } });
  } catch (e) {
    console.log(e);
  }
};

const UpdatePassword = (props) => {
  const { password, passwordValid, confirm, confirmValid } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const formValid = passwordValid && confirmValid;
  const queryParams = queryString.parse(location.search);

  const updatePasswordRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/reset", { password });
      console.log(res.data);
    } catch (e) {
      console.log(e);
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
      text: "update personal info",
      size: "large",
      disabled: !formValid,
      onClick: updatePasswordRequest,
    },
  ];

  return <Form inputs={inputs} buttons={buttons} />;
};

export default UpdatePassword;
