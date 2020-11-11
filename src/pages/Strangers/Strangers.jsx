import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import UserProfile from "../../containers/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../components/Filter/Filter";
import { useNotifications } from "../../hooks/useNotifications";
import { loadStrangers } from "../../store/usersSlice";

const useStyles = makeStyles({
  Strangers: {
    fontSize: "2rem",
    paddingBottom: "60px",
  },
  CardContainer: {
    paddingBottom: "90px",
  },
  Text: {
    marginTop: "1rem",
    width: "100%",
    textAlign: "center",
  },
});

const Strangers = () => {
  const showNotif = useNotifications();
  const allUsers = useSelector((state) => state.users.users);
  const strangers = useSelector((state) => state.users.strangers);
  const filter = useSelector((state) => state.filter);
  const [cards, setCards] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  // load strangers on component mount
  useEffect(() => {
    dispatch(loadStrangers(showNotif));
  }, [dispatch]);

  // filter users
  useEffect(() => {
    let filteredUsers = strangers.filter(
      (user) => user.age >= filter.age.minAge && user.age <= filter.age.maxAge
    );
    filteredUsers =
      filter.username.length > 0
        ? filteredUsers.filter((user) =>
            user.username.toLowerCase().includes(filter.username.toLowerCase())
          )
        : filteredUsers;

    const cards =
      filteredUsers && filteredUsers.length ? (
        filteredUsers.map((el) => <UserCard user={el} key={el.id} />)
      ) : (
        <Typography className={classes.Text}>No users to display</Typography>
      );
    setCards(cards);
  }, [filter, classes.Text, strangers]);

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
