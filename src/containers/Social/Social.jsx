import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClickableUsersList from "../../components/ClickableUsersList/ClickableUsersList";

const useStyles = makeStyles({
  Grid: {
    overflow: "hidden",
    width: "100%",
  },
  Header: {
    fontSize: "2rem",
    marginTop: 30,
  },
  List: {
    width: "80%",
  },
});

const Social = () => {
  const classes = useStyles();
  const { lookedBy, likedBy, matches } = useSelector((state) => state.general);
  const { users } = useSelector((state) => state.users);

  const [looked, setLooked] = useState([]);
  const [liked, setLiked] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (!lookedBy || !lookedBy.length) return;
    const lookedUsers = lookedBy.map((id) =>
      users.find((user) => user.id === id)
    );
    setLooked(lookedUsers);
  }, [users, lookedBy]);

  useEffect(() => {
    if (!likedBy || !likedBy.length) return;
    const lookedUsers = likedBy.map((id) =>
      users.find((user) => user.id === id)
    );
    setLiked(lookedUsers);
  }, [users, likedBy]);

  useEffect(() => {
    if (!matches || !matches.length) return;
    const matchedUsers = matches.map((id) =>
      users.find((user) => user.id === id)
    );
    setMatched(matchedUsers);
  }, [users, matches]);

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
        className={classes.List}
      >
        <Typography variant="h2" className={classes.Header}>
          People, who looked me
        </Typography>
        <ClickableUsersList items={looked} defaultText={"No one visited you"} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
        className={classes.List}
      >
        <Typography variant="h2" className={classes.Header}>
          People, who liked me
        </Typography>
        <ClickableUsersList items={liked} defaultText={"No one liked you"} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        wrap="nowrap"
        className={classes.List}
      >
        <Typography variant="h2" className={classes.Header}>
          People, who matched with me
        </Typography>
        <ClickableUsersList items={matched} defaultText={"No one liked you"} />
      </Grid>
    </Grid>
  );
};

export default Social;
