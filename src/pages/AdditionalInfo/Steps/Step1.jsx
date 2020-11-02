import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form/Form";
import {
  changeBirthDate,
  changeFirstName,
  changeFirstNameValid,
  changeGender,
  changeLastName,
  changeLastNameValid,
} from "../additionalSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const { name, surname, birthDate, gender } = {
    ...useSelector((state) => state.additional),
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      label: "First name",
      value: name,
      onChange: (e) => {
        dispatch(changeFirstName(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeFirstNameValid(isValid));
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
        dispatch(changeLastName(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeLastNameValid(isValid));
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
