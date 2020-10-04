import * as React from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../axios";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Slider,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../style";

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const genders = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "both",
      label: "Both",
    },
  ];

  const onLoginHandler = (history) => {
    history.push("/login");
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    let year = date.getFullYear();
    if (year < 10) year = "000" + year;
    else if (year < 100) year = "00" + year;
    else if (year < 1000) year = "0" + year;
    else if (year > 3000) year = 3000;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : "" + month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : "" + day;
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: props.email,
      username: props.username,
      password: props.password,
      birth_date: props.birthDate / 10,
      phone: props.phone,
      gender: props.gender,
      country: props.country,
      city: props.city,
      max_dist: props.maxDist,
      look_for: props.lookFor,
      min_age: props.minAge,
      max_age: props.maxAge,
    };
    console.log(body);
    const response = await api.post("signin", body);
    console.log(response.data);
    history.push("/main");
    // if (response.data.status === true) {
    //   // props.saveNewState(response.data.data);
    // } else {
    //   // show notification on failure
    // }
    // dispatch call to server
    // props.onRegister();
  };

  return (
    <form className="screen__center">
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="email"
        label="Email"
        variant="outlined"
        value={props.email}
        onChange={(e) => props.changeEmail(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="Phone"
        variant="outlined"
        value={props.phone}
        onChange={(e) => props.changePhone(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="Username"
        variant="outlined"
        value={props.username}
        onChange={(e) => props.changeUsername(e.target.value)}
        required
      />
      {/* <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="First Name"
        variant="outlined"
        value={props.firstName}
        onChange={(e) => props.changeFirstName(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="Last Name"
        variant="outlined"
        value={props.lastName}
        onChange={(e) => props.changeLastName(e.target.value)}
        required
      /> */}
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="date"
        label="Birth Date"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={getDate(props.birthDate)}
        onChange={(e) => props.changeBirthDate(e.target.value)}
        required
      />

      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="select"
        label="Gender"
        variant="outlined"
        value={props.gender}
        onChange={(e) => props.changeGender(e.target.value)}
        required
        select
      >
        {genders
          .fileter((el) => el.value !== "both")
          .map((el) => (
            <MenuItem key={el.value} value={el.value}>
              {el.label}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="Country"
        variant="outlined"
        value={props.country}
        onChange={(e) => props.changeCountry(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="text"
        label="City"
        variant="outlined"
        value={props.city}
        onChange={(e) => props.changeCity(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="number"
        label="Maximum search distance"
        variant="outlined"
        value={props.maxDist}
        onChange={(e) => props.changeMaxDist(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="select"
        label="Look for"
        variant="outlined"
        value={props.lookFor}
        onChange={(e) => props.changeLookFor(e.target.value)}
        required
        select
      >
        {genders.map((el) => (
          <MenuItem key={el.value} value={el.value}>
            {el.label}
          </MenuItem>
        ))}
      </TextField>
      <Box className={[classes.Margin, classes.Input].join(" ")}>
        <Typography id="range-slider" gutterBottom>
          Search age range
        </Typography>
        <Slider
          value={[props.minAge, props.maxAge]}
          onChange={(e, value) => props.changeSearchAgeRange(value)}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </Box>
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="password"
        label="Password"
        variant="outlined"
        value={props.password}
        onChange={(e) => props.changePassword(e.target.value)}
        required
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="password"
        label="Confirm password"
        variant="outlined"
        value={props.confirm}
        onChange={(e) => {
          props.changeConfirmPassword(e.target.value);
        }}
        required
      />
      <Button
        className={classes.Margin}
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        onClick={(e) => onRegisterHandler(e)}
      >
        Sign up
      </Button>
      <Button
        className={classes.Margin}
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => onLoginHandler(history)}
      >
        Already a member?
      </Button>
    </form>
  );
};

export default Register;
