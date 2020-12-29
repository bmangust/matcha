import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Route, Switch, useLocation } from "react-router-dom";
import UserProfile from "../../containers/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "../../hooks/useNotifications";
import { loadStrangers } from "../../store/usersSlice";
import FilterSortWrapper from "../../components/FIlterSortWrapper/FilterSortWrapper";

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
  const location = useLocation();
  const [cards, setCards] = useState(null);
  const [routes, setRoutes] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  // load strangers on component mount
  useEffect(() => {
    dispatch(loadStrangers(showNotif));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filter users and set cards
  useLayoutEffect(() => {
    // filter strangers by age
    let filteredUsers = strangers.filter(
      (user) => user.age >= filter.age.minAge && user.age <= filter.age.maxAge
    );
    // filter strangers by keys
    for (let key of ["username", "city", "country"]) {
      filteredUsers =
        filter[key].length > 0
          ? filteredUsers.filter((user) =>
              user[key].toLowerCase().includes(filter[key].toLowerCase())
            )
          : filteredUsers;
    }
    filteredUsers =
      filter.gender.length > 0 && filter.gender !== "both"
        ? filteredUsers.filter((user) => user.gender === filter.gender)
        : filteredUsers;
    filteredUsers =
      filter.tags.length > 0
        ? filteredUsers.filter((user) => {
            const regexString = new RegExp(
              filter.tags
                .reduce((prev, acc) => `${acc}|${prev}`)
                .replace(/\\/g, "\\\\")
                .replace("(", "\\(")
                .replace(")", "\\)")
            );
            if (!user.tags || user.tags.length === 0) return true;
            return user.tags.find((tag) => regexString.test(tag));
          })
        : filteredUsers;

    if (location.pathname.length > 1) return;
    const cards =
      filteredUsers && filteredUsers.length ? (
        filteredUsers.map((el) => <UserCard user={el} key={el.id} />)
      ) : (
        <Typography className={classes.Text}>No users to display</Typography>
      );
    setCards(cards);
  }, [filter, classes.Text, strangers, location.pathname]);

  const memorizedRoutes = useMemo(
    () =>
      allUsers &&
      allUsers.map((el) => (
        <Route
          key={el.id}
          path={`/strangers/:id`}
          render={() => <UserProfile user={el} />}
        />
      )),
    [allUsers]
  );

  useEffect(() => {
    setRoutes(memorizedRoutes);
  }, [memorizedRoutes]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Strangers}
    >
      <Switch>
        {routes}
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
              <FilterSortWrapper />
            </Grid>
          )}
        />
      </Switch>
    </Grid>
  );
};

export default Strangers;
