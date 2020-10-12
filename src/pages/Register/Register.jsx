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
  makeStyles,
  Container,
  List,
} from "@material-ui/core";
import { theme } from "../../theme";

const useStyles = makeStyles({
  Input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  Form: {
    width: "50%",
    textAlign: "center",
  },
  Button: {
    margin: "8px",
  },
});

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
      birth_date: props.birthDate,
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
    const response = await api.post("signup", body);
    console.log(response.data);
    if (response.data.status === true) {
      // props.saveNewState(response.data.data);
      history.push("login");
    } else {
      // show notification on failure
    }
    // dispatch call to server
    // props.onRegister();
  };

  return (
    <Container>
      <form className={classes.Form}>
        <List>
          <TextField
            className={classes.Input}
            type="email"
            label="Email"
            value={props.email}
            onChange={(e) => props.changeEmail(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="text"
            label="Phone"
            value={props.phone}
            onChange={(e) => props.changePhone(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="text"
            label="Username"
            value={props.username}
            onChange={(e) => props.changeUsername(e.target.value)}
            required
          />
          {/* <TextField
        className={classes.Input}
        type="text"
        label="First Name"
        
        value={props.firstName}
        onChange={(e) => props.changeFirstName(e.target.value)}
        required
      />
      <TextField
        className={classes.Input}
        type="text"
        label="Last Name"
        
        value={props.lastName}
        onChange={(e) => props.changeLastName(e.target.value)}
        required
      /> */}
          <TextField
            className={classes.Input}
            type="date"
            label="Birth Date"
            InputLabelProps={{ shrink: true }}
            value={getDate(props.birthDate)}
            onChange={(e) => props.changeBirthDate(e.target.value)}
            required
          />

          <TextField
            className={classes.Input}
            type="select"
            label="Gender"
            value={props.gender}
            onChange={(e) => props.changeGender(e.target.value)}
            required
            select
          >
            {genders
              .filter((el) => el.value !== "both")
              .map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            className={classes.Input}
            type="text"
            label="Country"
            value={props.country}
            onChange={(e) => props.changeCountry(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="text"
            label="City"
            value={props.city}
            onChange={(e) => props.changeCity(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="number"
            label="Maximum search distance"
            value={props.maxDist}
            onChange={(e) => props.changeMaxDist(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="select"
            label="Look for"
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
          <Box className={classes.Input}>
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
            className={classes.Input}
            type="password"
            label="Password"
            value={props.password}
            onChange={(e) => props.changePassword(e.target.value)}
            required
          />
          <TextField
            className={classes.Input}
            type="password"
            label="Confirm password"
            value={props.confirm}
            onChange={(e) => {
              props.changeConfirmPassword(e.target.value);
            }}
            required
          />
          <Button
            className={classes.Button}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={(e) => onRegisterHandler(e)}
          >
            Sign up
          </Button>
          <Button
            className={classes.Button}
            color="primary"
            size="large"
            onClick={() => onLoginHandler(history)}
          >
            Already a member?
          </Button>
        </List>
      </form>
    </Container>
  );
};

export default Register;
