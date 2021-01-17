import React, { useEffect, useLayoutEffect, useState } from "react";
import { Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import { DashboardRounded, MapRounded } from "@material-ui/icons";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadStrangers } from "../../store/usersSlice";
import { useNotifications } from "../../hooks/useNotifications";

import UserProfile from "../../containers/UserProfile/UserProfile";
import FilterSortWrapper from "../../components/FIlterSortWrapper/FilterSortWrapper";
import UserCard from "../../components/UserCard/UserCard";
import Map from "../../components/Map/Map";

const useStyles = makeStyles((theme) => ({
  Strangers: {
    fontSize: "2rem",
    paddingBottom: "60px",
    position: "relative",
  },
  CardContainer: {
    paddingBottom: "90px",
  },
  Text: {
    marginTop: "1rem",
    width: "100%",
    textAlign: "center",
  },
  Fab: {
    position: "fixed",
    right: "10px",
    bottom: "61px",
    zIndex: 20,
    [theme.breakpoints.down("xs")]: {
      bottom: "121px",
    },
  },
  Map: {
    width: "70vw",
    height: "70vh",
  },
}));

const Strangers = () => {
  const { notif } = useNotifications();
  const strangers = useSelector((state) => state.users.strangers);
  const filter = useSelector((state) => state.filter);
  const location = useLocation();
  const [cards, setCards] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mapShown, setMapShown] = useState(false);

  // load strangers on component mount
  useEffect(() => {
    dispatch(loadStrangers(notif));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filter users and set cards
  useLayoutEffect(() => {
    // filter strangers by age
    let filteredUsers = strangers.filter(
      (user) =>
        user.age >= filter.age.minAge &&
        user.age <= filter.age.maxAge &&
        user.rating >= filter.rating.min &&
        user.rating <= filter.rating.max
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
    // filter strangers by gender
    filteredUsers =
      filter.gender.length > 0 && filter.gender !== "both"
        ? filteredUsers.filter((user) => user.gender === filter.gender)
        : filteredUsers;
    // filter strangers by tags
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

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Strangers}
    >
      <Switch>
        <Route path={`/strangers/:id`} render={() => <UserProfile />} />
        <Route
          path="/"
          exact
          render={() => (
            <>
              <Grid
                className={classes.CardContainer}
                container
                item
                xs={10}
                spacing={3}
              >
                {mapShown ? (
                  <Map strangers={strangers} classes={classes.Map} />
                ) : (
                  <>
                    {cards}
                    <FilterSortWrapper />
                  </>
                )}
              </Grid>
              <Fab
                className={classes.Fab}
                variant="extended"
                color="primary"
                size="large"
                onClick={() => setMapShown((shown) => !shown)}
              >
                {mapShown ? (
                  <>
                    <DashboardRounded style={{ marginRight: 5 }} />
                    Show cards
                  </>
                ) : (
                  <>
                    <MapRounded style={{ marginRight: 5 }} />
                    Show map
                  </>
                )}
              </Fab>
            </>
          )}
        />
      </Switch>
    </Grid>
  );
};

export default Strangers;
