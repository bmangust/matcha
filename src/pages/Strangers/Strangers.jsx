import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { api } from "../../axios";

const useStyles = makeStyles({
  Strangers: {
    fontSize: "2rem",
    paddingBottom: "60px",
  },
});

const Strangers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const [cards, setCards] = useState(null);

  const getUsers = async () => {
    const res = await api.get("strangers");
    console.log(res.data);
    if (res.data.status) {
      console.log(res.data.data);
      return res.data.data;
    }
    return null;
  };

  useEffect(() => {
    console.log("[Strangers] loaded");
    getUsers().then((res) => setUsers(res));
  }, []);

  useEffect(() => {
    const noUsers = <Typography>No users to display</Typography>;
    if (!users) {
      setCards(noUsers);
      return;
    }
    console.log(users);
    const cards = users.map((el) => <UserCard {...el} key={el.id} />);
    setCards(cards);
  }, [users]);

  console.log(users);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Strangers}
    >
      <Grid container item xs={10} spacing={3}>
        {cards}
      </Grid>
    </Grid>
  );
};

export default Strangers;
