import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../axios";
import { getLocationByIp } from "../../utils";
import { useSnackbar } from "notistack";
import { saveNewState } from "../../store/generalSlice";
import Form from "../../components/Form/Form";

const UpdateInfo = () => {
  const loadedInfo = useSelector((state) => state.general);
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState(loadedInfo.username);
  const [email, setEmail] = useState(loadedInfo.email);
  const [phone, setPhone] = useState(loadedInfo.phone);
  const [birthDate, setBirthDate] = useState(loadedInfo.birthDate);
  const [gender, setGender] = useState(loadedInfo.gender);
  const [lookFor, setLookFor] = useState(loadedInfo.lookFor);
  const [country, setCountry] = useState(loadedInfo.country);
  const [city, setCity] = useState(loadedInfo.city);
  const [maxDist, setMaxDistance] = useState(loadedInfo.maxDist);
  const [ageRange, setAgeRange] = useState([
    loadedInfo.minAge,
    loadedInfo.maxAge,
  ]);
  const [password, setPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [countryValid, setCountryValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [formValid, setFormValid] = useState(true);
  const dispatch = useDispatch();

  const changeBirthDate = (newDate) => {
    let date = null;
    if (typeof newDate === "string" && newDate.indexOf("-") === -1) {
      date = new Date(+newDate).getTime();
    } else {
      date = new Date(newDate).getTime();
    }
    if (date && !isNaN(date)) setBirthDate(date);
  };

  useEffect(() => {
    const formValid =
      usernameValid &&
      emailValid &&
      phoneValid &&
      countryValid &&
      cityValid &&
      passwordValid;
    setFormValid(formValid);
  }, [
    usernameValid,
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
      id: loadedInfo.id,
      email,
      username,
      birthDate,
      phone,
      gender,
      country,
      city,
      maxDist,
      lookFor,
      minAge: ageRange[0],
      maxAge: ageRange[1],
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
      enqueueSnackbar("Successfully saved!", { variant: "success" });
    } else {
      console.log(response.data);
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      ignoreTouched: true,
      onChange: (e) => {
        setUsername(e.target.value);
      },
      onValidate: (isValid) => {
        setUsernameValid(isValid);
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
      ignoreTouched: true,
      onChange: (e) => {
        setEmail(e.target.value);
      },
      onValidate: (isValid) => {
        setEmailValid(isValid);
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
      name: "phone",
      type: "text",
      label: "Phone",
      value: phone,
      ignoreTouched: true,
      onChange: (e) => {
        setPhone(e.target.value);
      },
      onValidate: (isValid) => {
        setPhoneValid(isValid);
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
        changeBirthDate(e.target.value);
      },
    },
    {
      name: "gender",
      type: "select",
      label: "I'm",
      values: ["male", "female"],
      value: gender,
      onChange: (e) => {
        setGender(e.target.value);
      },
    },
    {
      name: "lookFor",
      type: "select",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        setLookFor(e.target.value);
      },
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      ignoreTouched: true,
      onChange: (e) => {
        setCountry(e.target.value);
      },
      onValidate: (isValid) => {
        setCountryValid(isValid);
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
      ignoreTouched: true,
      onChange: (e) => {
        setCity(e.target.value);
      },
      onValidate: (isValid) => {
        setCityValid(isValid);
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
        setMaxDistance(value);
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: ageRange,
      onChange: (value) => {
        setAgeRange(value);
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      ignoreTouched: true,
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
