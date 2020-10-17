import React from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  Button,
  Container,
  List,
  ListItem,
  makeStyles,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { theme } from "../../theme";

import { changeEmail, changePassword } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../store/generalSlice";
import Input from "../../components/Input/Input";

const useStyles = makeStyles({
  Input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  Grid: {
    width: "50%",
    height: "100vh",
  },
  Form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    margin: "8px",
  },
  List: {
    width: "100%",
  },
  Buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.login);
  const { isLoading } = useSelector((state) => state.general);
  const classes = useStyles();
  const history = useHistory();

  const onReginsterHandler = (history) => {
    history.push("register");
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    dispatch(auth(email, password, enqueueSnackbar));
  };
  const inputs = [
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      onChange: (e) => {
        dispatch(changeEmail(e.target.value));
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      onChange: (e) => {
        dispatch(changePassword(e.target.value));
      },
    },
  ];

  const form = (
    <form className={classes.Form}>
      <List className={classes.List}>
        {inputs.map((el) => (
          <ListItem key={el.name}>
            <Input {...el} />
          </ListItem>
        ))}
        <ListItem className={classes.Buttons}>
          <Button
            variant="contained"
            className={classes.Button}
            type="submit"
            onClick={(e) => onLoginHandler(e)}
          >
            Login
          </Button>
          <Button
            className={classes.Button}
            onClick={() => onReginsterHandler(history)}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </form>
  );

  return (
    <Container>
      <Grid
        className={classes.Grid}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {isLoading ? <CircularProgress /> : form}
      </Grid>
    </Container>
  );
};

export default Login;
