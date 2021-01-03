import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form/Form";
import {
  changeCity,
  changeCityValid,
  changeCountry,
  changeCountryValid,
  changePhone,
  changePhoneValid,
  changeBio,
  changeBioValid,
} from "../additionalSlice";

const Step2 = () => {
  const dispatch = useDispatch();
  const { phone, country, city, bio } = useSelector(
    (state) => state.additional
  );

  const inputs = [
    {
      name: "phone",
      type: "text",
      label: "Phone",
      value: phone,
      ignoreUntouched: true,
      inputProps: { autoFocus: true },
      onChange: (e) => {
        dispatch(changePhone(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changePhoneValid(isValid));
      },
      rules: {
        helperText: "invalid phone",
        rule: {
          minLength: 0,
          maxLength: 12,
          regex: /^$|^\+?\d+$/,
        },
      },
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      onChange: (e) => {
        dispatch(changeCountry(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeCountryValid(isValid));
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
      name: "city",
      type: "text",
      label: "City",
      value: city,
      onChange: (e) => {
        dispatch(changeCity(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeCityValid(isValid));
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
      name: "bio",
      type: "text",
      label: "Bio",
      value: bio,
      ignoreUntouched: true,
      inputProps: { autoFocus: true },
      onChange: (e) => {
        dispatch(changeBio(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeBioValid(isValid));
      },
      rules: {
        helperText: "invalid phone",
        rule: {
          minLength: 2,
          maxLength: 256,
          regex: /^.+$/,
        },
      },
    },
  ];

  return <Form inputs={inputs} />;
};

export default Step2;
