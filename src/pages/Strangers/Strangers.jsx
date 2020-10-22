import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { api } from "../../axios";
import { Route, Switch } from "react-router-dom";
import UserProfile from "../../containers/UserProfile/UserProfile";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  Strangers: {
    fontSize: "2rem",
    paddingBottom: "60px",
  },
});

const Strangers = () => {
  const myId = useSelector((state) => state.general.id);
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const [cards, setCards] = useState(null);

  const getUsers = async () => {
    const res = await api.get("strangers");
    if (res.data.status) {
      return res.data.data;
    }
    return null;
  };

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    const noUsers = <Typography>No users to display</Typography>;
    if (!users) {
      setCards(noUsers);
      return;
    }
    const cards = users.map((el) =>
      el.id === myId ? null : <UserCard {...el} key={el.id} />
    );
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
              render={() => <UserProfile {...el} />}
            />
          ))}
        <Route
          path="/"
          exact
          render={() => (
            <Grid container item xs={10} spacing={3}>
              {cards}
            </Grid>
          )}
        />
      </Switch>
    </Grid>
  );
};

export default Strangers;
