import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  Item: {
    padding: "10px 15px",
    margin: "0 10px",
    fontSize: "1rem",
  },
  Header: {
    fontSize: "1.3rem",
    fontWeight: 500,
    display: "block",
  },
  Container: {
    width: "100%",
    padding: "0.5rem 0",
  },
});

const Bio = ({ bio }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid
        className={classes.Container}
        container
        direction="column"
        alignItems="flex-start"
        item
      >
        <Typography className={classes.Header}>Bio:</Typography>
        <Grid>
          <Paper className={classes.Item}>
            <Typography>{bio}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bio;
