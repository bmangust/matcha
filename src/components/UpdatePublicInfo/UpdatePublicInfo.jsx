import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../Form/Form";
import {
  changeUsername,
  changeName,
  changeSurname,
  changeGender,
  changeBio,
  changeCountry,
  changeCity,
  changeTags,
  changeUsernameValid,
  changeNameValid,
  changeSurnameValid,
  changeBioValid,
  changeCountryValid,
  changeCityValid,
  updateInfo,
} from "../../pages/AdditionalInfo/additionalSlice";
import { useNotifications } from "../../hooks/useNotifications";
import { handleBack } from "../../store/UISlice";
import { useHistory } from "react-router-dom";

const UpdatePublicInfo = () => {
  const {
    username,
    name,
    surname,
    bio,
    gender,
    country,
    city,
    usernameValid,
    nameValid,
    surnameValid,
    countryValid,
    cityValid,
    tags,
  } = useSelector((state) => state.additional);
  const dispatch = useDispatch();
  const history = useHistory();
  const showNotif = useNotifications();

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    const formValid =
      usernameValid && nameValid && surnameValid && countryValid && cityValid;
    setFormValid(formValid);
  }, [usernameValid, nameValid, surnameValid, countryValid, cityValid]);

  const saveUserInfo = async (e) => {
    e.preventDefault();
    const body = { username, name, surname, gender, country, city, bio, tags };
    dispatch(updateInfo(body, showNotif));
  };

  const handleBackClick = () => {
    dispatch(handleBack(history, "profile"));
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
      ignoreUntouched: true,
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
      ignoreUntouched: true,
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
      name: "bio",
      type: "text",
      label: "Bio",
      value: bio,
      ignoreUntouched: true,
      onChange: (e) => {
        dispatch(changeBio(e.target.value));
      },
      onValidate: (isValid) => {
        changeBioValid(isValid);
      },
      rules: {
        helperText: "Write some info about yourself",
        rule: {
          minLength: 2,
          maxLength: 256,
          regex: /^.+$/,
        },
      },
    },
    {
      name: "tags",
      type: "autocomplete",
      values: [],
      onChange: (values) => dispatch(changeTags(values)),
    },
  ];

  const buttons = [
    {
      component: "fab",
      type: "submit",
      text: "Save",
      size: "large",
      disabled: !formValid,
      onClick: saveUserInfo,
    },
    {
      text: "back",
      size: "large",
      onClick: handleBackClick,
      style: {
        marginBottom: "2rem",
      },
    },
  ];

  return <Form inputs={inputs} buttons={buttons} />;
};

export default UpdatePublicInfo;
