import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { setHeader, showBackButton, setParent } from "../../store/UISlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";

const useStyles = makeStyles({
  FullWidth: {
    width: "100%",
  },
  Button: {
    width: "80%",
    margin: "0.5rem 0",
  },
});

const UpdatePersonalInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.general.email);
  const notif = useNotifications();

  const changeEmailRequest = () => {};
  const changePasswordRequest = () => {
    dispatch(setParent({ parent: "profile" }));
    dispatch(setHeader({ header: "Update password" }));
    dispatch(showBackButton());
    const res = api.post("/reset", { email });
    notif("Check your email", "info");
    // history.push("/profile/password-update");
  };
  const changeUsernameRequest = () => {};

  const buttons = [
    {
      component: "button",
      text: "update email",
      size: "large",
      onClick: changeEmailRequest,
    },
    {
      component: "button",
      text: "update username",
      size: "large",
      onClick: changeUsernameRequest,
    },
    {
      component: "button",
      text: "request change password link",
      size: "large",
      onClick: changePasswordRequest,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
      {buttons.map(({ component, variant, type, text, onClick, ...others }) => (
        <Button
          key={text}
          className={classes.Button}
          variant={variant}
          type={type}
          onClick={onClick}
          {...others}
        >
          {text}
        </Button>
      ))}
    </Grid>
  );
};

export default UpdatePersonalInfo;
