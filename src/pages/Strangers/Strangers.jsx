import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { api, CancelToken } from "../../axios";
import { Route, Switch, useHistory } from "react-router-dom";
import UserProfile from "../../containers/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../components/Filter/Filter";
import { useSnackbar } from "notistack";
import Axios from "axios";
import { loadStrangers, loadUsers } from "../../store/usersSlice";

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
  try {
    const res = await api.get("strangers", { cancelToken: source.token });
    console.log(res.data);
    if (res.data.status && res.data.data) {
      return res.data.data.map((user) => addAge(user));
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

const Strangers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const myId = useSelector((state) => state.general.id);
  const allUsers = useSelector((state) => state.users.users);
  const strangers = useSelector((state) => state.users.strangers);
  const filter = useSelector((state) => state.filter);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStrangers(enqueueSnackbar));
  }, []);
  // store fetched users in local state
  useEffect(() => {
    //filter myId
    let filterdUsers = allUsers
      .filter((el) => el.id !== myId)
      .filter(
        (user) => user.age >= filter.age.minAge && user.age <= filter.age.maxAge
      );
    filterdUsers =
      filter.username.length > 0
        ? filterdUsers.filter((user) =>
            user.username.toLowerCase().includes(filter.username.toLowerCase())
          )
        : filterdUsers;
    console.log(filterdUsers);
  }, [myId, filter]);

  const cards =
    strangers && strangers.legnth ? (
      strangers.map((el) => <UserCard user={el} key={el.id} />)
    ) : (
      <Typography>No users to display</Typography>
    );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Strangers}
    >
      <Switch>
        {allUsers &&
          allUsers.map((el) => (
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
    </Grid>
  );
};

export default Strangers;
