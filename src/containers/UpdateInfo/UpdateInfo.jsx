import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../axios";
import { getLocationByIp } from "../../utils";
import { saveNewState } from "../../store/generalSlice";
import Form from "../../components/Form/Form";
import {
  changeEmail,
  changeUsername,
  changeName,
  changeSurname,
  changeBirthDate,
  changeGender,
  changePhone,
  changeCountry,
  changeCity,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,
  changeEmailValid,
  changeUsernameValid,
  changeNameValid,
  changeSurnameValid,
  changePhoneValid,
  changeCountryValid,
  changeCityValid,
} from "../../pages/AdditionalInfo/additionalSlice";
import { useNotifications } from "../../hooks/useNotifications";

const UpdateInfo = () => {
  const {
    id,
    email,
    username,
    name,
    surname,
    birthDate,
    phone,
    gender,
    country,
    city,
    maxDist,
    lookFor,
    minAge,
    maxAge,
    usernameValid,
    nameValid,
    surnameValid,
    emailValid,
    phoneValid,
    countryValid,
    cityValid,
  } = useSelector((state) => state.additional);
  const dispatch = useDispatch();
  const showNotif = useNotifications();

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    const formValid =
      usernameValid &&
      nameValid &&
      surnameValid &&
      emailValid &&
      phoneValid &&
      countryValid &&
      cityValid &&
      passwordValid;
    setFormValid(formValid);
  }, [
    usernameValid,
    nameValid,
    surnameValid,
    emailValid,
    phoneValid,
    countryValid,
    cityValid,
    passwordValid,
  ]);

  const saveUserInfo = async (e) => {
    e.preventDefault();
    const location = await getLocationByIp();
    const body = {
      id,
      email,
      username,
      name,
      surname,
      birthDate,
      phone,
      gender,
      country,
      city,
      maxDist,
      lookFor,
      minAge,
      maxAge,
    };
    if (location.status) body.position = location.data;
    if (password.length) {
      body.password = password;
    }
    // console.log("[UpdateInfo] update user info");
    // console.log(body);
    const response = await api.post("user", body);

    if (response.data.status) {
      dispatch(saveNewState(body));
      showNotif("Successfully saved!");
    } else {
      console.log(response.data);
      showNotif("Server error", "error");
    }
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
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      ignoreUntouched: true,
      onChange: (e) => {
        dispatch(changeEmail(e.target.value));
      },
      onValidate: (isValid) => {
        dispatch(changeEmailValid(isValid));
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
      name: "phone",
      type: "text",
      label: "Phone",
      value: phone,
      ignoreUntouched: true,
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
    {
      name: "lookFor",
      type: "select",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        dispatch(changeLookFor(e.target.value));
      },
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      ignoreUntouched: true,
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
      ignoreUntouched: true,
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
      name: "maxDist",
      type: "slider",
      label: "Search distance",
      value: maxDist,
      onChange: (value) => {
        dispatch(changeMaxDist(value));
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: [minAge, maxAge],
      onChange: (value) => {
        dispatch(changeSearchAgeRange(value));
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      ignoreUntouched: true,
      onChange: (e) => {
        setPassword(e.target.value);
      },
      onValidate: (isValid) => {
        setPasswordValid(isValid);
      },
      rules: {
        helperText:
          "Use at least one lower- and uppercase letter, number and symbol. Min length 4",
        rule: {
          minLength: 0,
          maxLength: 20,
          regex: /^$|^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{4,}$/,
        },
      },
    },
  ];

  const buttons = [
    {
      type: "submit",
      text: "Save",
      size: "large",
      disabled: !formValid,
      onClick: saveUserInfo,
    },
  ];

  return <Form inputs={inputs} buttons={buttons} />;
};

export default UpdateInfo;
