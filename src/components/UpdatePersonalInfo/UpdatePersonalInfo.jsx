import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import {
  setHeader,
  showBackButton,
  setParent,
  handleBack,
} from "../../store/UISlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import cn from "classnames";
import DialogMessage from "../DialogMessage/DialogMessage";

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
});

const UpdatePersonalInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.general.email);
  const notif = useNotifications();

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
  const handleBackClick = () => {
    dispatch(handleBack(history, "profile"));
  };

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
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
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
