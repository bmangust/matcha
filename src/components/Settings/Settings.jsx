import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { setHeader, showBackButton, setParent } from "../../store/UISlice";
import UpdatePassword from "../../components/UpdatePassword/UpdatePassword";
import UpdatePersonalInfo from "../../components/UpdatePersonalInfo/UpdatePersonalInfo";
import UpdatePublicInfo from "../../components/UpdatePublicInfo/UpdatePublicInfo";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import { useDispatch } from "react-redux";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  Button: {
    width: "60%",
    margin: "0.5rem 0",
  },
  "@media (max-width: 600px)": {
    Button: {
      width: "100%",
    },
  },
});
const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const selectRoute = ({ header, url }) => {
    dispatch(setParent({ parent: "profile" }));
    dispatch(setHeader({ header }));
    dispatch(showBackButton());
    history.push(`/profile/${url}`);
  };

  const updatePublicInfo = () => {
    selectRoute({
      header: "Update public info",
      url: "public",
    });
  };
  const updatePersonalInfo = () => {
    selectRoute({
      header: "Update personal info",
      url: "personal",
    });
  };
  const updateSettings = () => {
    selectRoute({
      header: "Settings",
      url: "settings",
    });
  };

  return (
    <>
      <Switch>
        <Route path="/profile" exact>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.root}
          >
            <Button className={classes.Button} onClick={updatePublicInfo}>
              Update public info
            </Button>
            <Button className={classes.Button} onClick={updatePersonalInfo}>
              Update personal info
            </Button>
            <Button className={classes.Button} onClick={updateSettings}>
              Settings
            </Button>
          </Grid>
        </Route>
        <Route path="/profile/public" component={UpdatePublicInfo} />
        <Route path="/profile/personal" component={UpdatePersonalInfo} />
        <Route path="/profile/settings" component={ProfileSettings} />
        <Route path="/profile/password-update" component={UpdatePassword} />
      </Switch>
    </>
  );
};

export default Settings;
