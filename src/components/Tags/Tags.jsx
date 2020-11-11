import { Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  Item: {
    margin: "0 5px",
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

const Tags = ({ tags }) => {
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
        <Typography className={classes.Header}>Interests:</Typography>
        <Grid>
          {tags.map((el) => (
            <Chip
              className={classes.Item}
              variant="outlined"
              key={el}
              label={el}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tags;
