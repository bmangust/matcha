import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import {
  setHeader,
  showBackButton,
  setParent,
  handleBack,
} from "../../store/UISlice";
import {
  changeEmail,
  changeBirthDate,
  changePhone,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,
  changeEmailValid,
  changePhoneValid,
  updateInfo,
  setAdditionalState,
} from "../../pages/AdditionalInfo/additionalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import cn from "classnames";
import DialogMessage from "../DialogMessage/DialogMessage";
import { useEffect } from "react";
import Form from "../Form/Form";
import { useState } from "react";

const useStyles = makeStyles({
  FullWidth: {
    width: "100%",
  },
  Button: {
    width: "80%",
    margin: "0.5rem 0",
  },
  lastButton: {
    marginTop: "2rem",
  },
  "@media (max-width: 600px)": {
    Button: {
      width: "100%",
    },
  },
});

const UpdatePersonalInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const notif = useNotifications();

  const {
    email,
    phone,
    birthDate,
    maxDist,
    lookFor,
    minAge,
    maxAge,
    emailValid,
    phoneValid,
  } = useSelector((state) => state.additional);
  const general = useSelector((state) => state.general);

  const changeEmailRequest = () => {};
  const changeUsernameRequest = () => {};
  const changePasswordRequest = () => {
    dispatch(setParent({ parent: "profile" }));
    dispatch(setHeader({ header: "Update password" }));
    dispatch(showBackButton());
    api.post("/reset", { email });
    notif("Check your email", "info");
    // history.push("/profile/password-update");
  };
  const [formValid, setFormValid] = useState(true);
  const handleBackClick = () => {
    dispatch(setAdditionalState(general));
    dispatch(handleBack(history, "profile"));
  };

  const saveUserInfo = async (e) => {
    e.preventDefault();
    const body = {
      email,
      phone,
      birthDate,
      maxDist,
      lookFor,
      minAge,
      maxAge,
    };
    dispatch(updateInfo(body, notif));
  };

  useEffect(() => {
    const formValid = emailValid && phoneValid;
    setFormValid(formValid);
  }, [emailValid, phoneValid]);

  const inputs = [
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
      name: "lookFor",
      type: "radio",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        dispatch(changeLookFor(e.target.value));
      },
    },
    {
      name: "maxDist",
      type: "slider",
      label: "Search distance, km",
      step: 10,
      min: 10,
      max: 10000,
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
  ];

  const formButtons = [
    {
      component: "fab",
      type: "submit",
      text: "Save",
      size: "large",
      disabled: !formValid,
      onClick: saveUserInfo,
    },
  ];

  const buttons = [
    {
      text: "update email",
      size: "large",
      onClick: changeEmailRequest,
    },
    {
      text: "update username",
      size: "large",
      onClick: changeUsernameRequest,
    },
    {
      text: "request change password link",
      size: "large",
      onClick: changePasswordRequest,
    },
    {
      text: "back",
      size: "large",
      onClick: handleBackClick,
      className: classes.lastButton,
    },
  ];

  const deleteAccountDialog = {
    text:
      "This action is irreversable. All your images, chats and likes will be vanished.",
    header: "Are you sure?",
    yesText: "Agree",
    noText: "Disagree",
    buttonText: "Delete account",
    className: classes.Button,
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
      <Form inputs={inputs} buttons={formButtons} />
      <DialogMessage {...deleteAccountDialog} />
      {buttons.map(
        ({ component, variant, text, onClick, className, ...others }) => (
          <Button
            key={text}
            className={
              className ? cn(className, classes.Button) : classes.Button
            }
            variant={variant}
            onClick={onClick}
            {...others}
          >
            {text}
          </Button>
        )
      )}
    </Grid>
  );
};

export default UpdatePersonalInfo;
