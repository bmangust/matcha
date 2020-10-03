import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { useStyles } from "../../style";

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const onLoginHandler = (history) => {
    history.push("/login");
  };

  // const onRegisterHandler = (history: any) => {
  //   // dispatch call to server
  //   // props.onRegister()
  // };

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
        label="Username"
        variant="outlined"
        value={props.username}
        onChange={(e) => props.changeUsername(e.target.value)}
        required
      />
      <TextField
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
      />
      <TextField
        className={[classes.Margin, classes.Input].join(" ")}
        type="date"
        label="birthDate"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={props.birthDate}
        onChange={(e) => {
          console.log(props);
          props.changeBirthDate(e.target.value);
        }}
        required
      />
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
          console.log(props);
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
