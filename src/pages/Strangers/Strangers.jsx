import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { api, CancelToken } from "../../axios";
import { Route, Switch, useHistory } from "react-router-dom";
import UserProfile from "../../containers/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import Filter from "./Filter/Filter";
import { useSnackbar } from "notistack";
import Axios from "axios";

const useStyles = makeStyles({
  Strangers: {
    fontSize: "2rem",
    paddingBottom: "60px",
  },
  CardContainer: {
    paddingBottom: "90px",
  },
});

const source = CancelToken.source();

const addAge = (user) => {
  const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
  return { ...user, age };
};

const getUsers = async () => {
  const res = await api.get("strangers", { cancelToken: source.token });
  console.log(res.data);
  if (res.data.status && res.data.data) {
    return res.data.data.map((user) => addAge(user));
  }
  return [];
};

const Strangers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const myId = useSelector((state) => state.general.id);
  const filter = useSelector((state) => state.filter);
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const [cards, setCards] = useState(null);
  const [isMounted, setIsMounted] = useState(true);

  const history = useHistory();

  // store fetched users in local state
  useEffect(() => {
    getUsers()
      //filter myId
      .then((res) => res.filter((el) => el.id !== myId))
      // apply other filters
      .then((res) => {
        return res.filter(
          (user) =>
            user.age >= filter.age.minAge && user.age <= filter.age.maxAge
        );
      })
      .then((res) => {
        return filter.username.length > 0
          ? res.filter((user) =>
              user.username
                .toLowerCase()
                .includes(filter.username.toLowerCase())
            )
          : res;
      })
      // save result
      .then((res) => isMounted && setUsers(res))
      .catch((err) => {
        if (Axios.isCancel(err)) {
          console.log("Request cancelled", err);
        } else {
          console.log(err);
          enqueueSnackbar("Server error", { variant: "error" });
        }
        setUsers(null);
      });
    return () => setIsMounted(false);
    // return () => setUsers(null);
  }, [myId, filter, enqueueSnackbar, isMounted]);

  // update view if users state was updated
  useEffect(() => {
    const noUsers = <Typography>No users to display</Typography>;
    if (!users) {
      setCards(noUsers);
      return;
    }
    const cards = users.map((el) => <UserCard user={el} key={el.id} />);
    setCards(cards);
  }, [users, myId]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Strangers}
    >
      <Switch>
        {users &&
          users.map((el) => (
            <Route
              key={el.id}
              path={`/strangers/:id`}
              render={() => <UserProfile user={el} />}
            />
          ))}
        <Route
          path="/"
          exact
          render={() => (
            <Grid
              className={classes.CardContainer}
              container
              item
              xs={10}
              spacing={3}
            >
              {cards}
              <Filter />
            </Grid>
          )}
        />
      </Switch>
      <Button onClick={() => history.push("/add")}>Add</Button>
    </Grid>
  );
};

export default Strangers;
