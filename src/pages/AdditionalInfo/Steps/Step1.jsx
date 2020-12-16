import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form/Form";
import {
  changeBirthDate,
  changeName,
  changeNameValid,
  changeGender,
  changeSurname,
  changeSurnameValid,
  changeUsernameValid,
  changeUsername,
} from "../additionalSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const { username, name, surname, birthDate, gender } = {
    ...useSelector((state) => state.additional),
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      ignoreUntouched: true,
      onChange: (e) => {
        dispatch(changeUsername(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeUsernameValid(isValid));
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
      name: "name",
      type: "text",
      label: "First name",
      value: name,
      onChange: (e) => {
        dispatch(changeName(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeNameValid(isValid));
      },
      rules: {
        helperText: "Use letters, numbers or symbols ., -. Min length 2",
        rule: {
          minLength: 2,
          maxLength: 20,
          regex: /^[\w-.]+$/,
        },
      },
    },
    {
      name: "surname",
      type: "text",
      label: "Last name",
      value: surname,
      onChange: (e) => {
        dispatch(changeSurname(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeSurnameValid(isValid));
      },
      rules: {
        helperText: "Use letters, numbers or symbols ., -. Min length 2",
        rule: {
          minLength: 2,
          maxLength: 20,
          regex: /^[\w-.]+$/,
        },
      },
    },
    {
      name: "birthDate",
      type: "date",
      label: "Birth date",
      value: birthDate,
      onChange: (e) => {
        dispatch(changeBirthDate(e.target.value));
      },
    },
    {
      name: "gender",
      type: "select",
      label: "I'm",
      values: ["male", "female"],
      value: gender,
      onChange: (e) => {
        dispatch(changeGender(e.target.value));
      },
    },
  ];
  return <Form inputs={inputs} />;
};

export default Step1;
