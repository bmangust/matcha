import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import { useNotifications } from "../../hooks/useNotifications";
import { setAdditionalState } from "../../pages/AdditionalInfo/additionalSlice";
import { checkAuth, setNewState } from "../../store/generalSlice";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});

const VerifyEmail = ({ key }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { notif } = useNotifications();

  useEffect(() => {
    try {
      const res = api("email/verify", { params: { key } });
      console.log(res.data);
      if (res.data.status) {
        dispatch(setNewState({ email: res.data.data }));
        dispatch(setAdditionalState({ email: res.data.data }));
        notif("Email successfully updated", "success");
      } else {
        notif("Email was not updated", "error");
      }
      dispatch(checkAuth());
      history.push("/");
    } catch (e) {
      notif("Server error", "error");
    }
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
