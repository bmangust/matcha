import React from "react";
import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  Item: {
    padding: "10px 15px",
    width: "100%",
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
  fullWidth: {
    width: "100%",
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
        <Grid className={classes.fullWidth}>
          <Chip className={classes.Item} label={bio} variant="outlined" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bio;
