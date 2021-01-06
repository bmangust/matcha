import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import { setAdditionalState } from "../../pages/AdditionalInfo/additionalSlice";
import { checkAuth, setNewState } from "../../store/generalSlice";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
  },
});

const VerifyEmail = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { notif } = useNotifications();
  const location = useLocation();

  useEffect(() => {
    try {
      console.log(location);
      const key = location.search.split("=")[1];
      const res = api(`email/verify?key=${key}`);
      console.log(res.data);
      if (res.data.status) {
        dispatch(setNewState({ email: res.data.data.email }));
        dispatch(setAdditionalState({ email: res.data.data.email }));
        notif("Email successfully updated", "success");
      } else {
        notif("Email was not updated", "error");
      }
    } catch (e) {
      // notif("Server error", "error");
    }
    dispatch(checkAuth());
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      Validating your request, please wait
    </Grid>
  );
};

export default VerifyEmail;
