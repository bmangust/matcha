import React from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  Button,
  TextField,
  Container,
  List,
  ListItem,
  makeStyles,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { theme } from "../../theme";

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
  ListItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();

  const onReginsterHandler = (history) => {
    history.push("register");
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    props.auth(props.email, props.password, enqueueSnackbar);
  };

  const form = (
    <form className={classes.Form}>
      <List className={classes.List}>
        <ListItem className={classes.ListItem}>
          <TextField
            type="email"
            label="Email"
            value={props.email}
            onChange={(event) => props.changeEmail(event.target.value)}
            required
          />
        </ListItem>
        <ListItem className={classes.ListItem}>
          <TextField
            type="password"
            label="Password"
            value={props.password}
            onChange={(event) => props.changePassword(event.target.value)}
            required
          />
        </ListItem>
        <ListItem className={classes.ListItem}>
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
        {props.isLoading ? <CircularProgress /> : form}
      </Grid>
    </Container>
  );
};

export default Login;
