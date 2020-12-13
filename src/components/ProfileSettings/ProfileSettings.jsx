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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const [state, setState] = useState({
    location: true,
    email: true,
  });

  const { location, email } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleCancel = () => {
    dispatch(handleBack(history, "profile"));
  };
  const handleSave = () => {
    // update info on server
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
                name="location"
              />
            }
            label="Use my current location for search"
          />
          <FormControlLabel
            control={
              <Checkbox checked={email} onChange={handleChange} name="email" />
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
