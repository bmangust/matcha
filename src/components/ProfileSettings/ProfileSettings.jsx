import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";
import {
  changeUseLocation,
  updateInfo,
} from "../../pages/AdditionalInfo/additionalSlice";
import { setNewState } from "../../store/generalSlice";
import { handleBack } from "../../store/UISlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  Buttons: {
    marginTop: 30,
  },
}));

const ProfileSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { useLocation } = useSelector((state) => state.general);
  const [state, setState] = useState({
    location: useLocation,
    email: true,
  });
  const notif = useNotifications();

  const { location, email } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleCancel = () => {
    dispatch(handleBack(history, "profile"));
  };
  const handleSave = () => {
    console.log("[ProfileSettings]", state);
    dispatch(setNewState({ useLocation: state.location }));
    dispatch(changeUseLocation(state.location));
    dispatch(updateInfo({ useLocation: state.location }, notif));
  };

  return (
    <Grid>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Profile settings</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={location}
                onChange={handleChange}
                color="primary"
                name="location"
              />
            }
            label="Use my current location for search"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={email}
                onChange={handleChange}
                color="primary"
                name="email"
              />
            }
            label="Send email notification"
          />
        </FormGroup>
        <Grid className={classes.Buttons} container justify="space-around">
          <Button onClick={handleCancel}>cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default ProfileSettings;
