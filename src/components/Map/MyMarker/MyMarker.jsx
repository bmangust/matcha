import React from "react";
import { Avatar, Grid, makeStyles } from "@material-ui/core";
import { Marker, Tooltip } from "react-leaflet";

const useStyles = makeStyles({
  Tooltip: {
    borderRadius: 30,
  },
  Grid: {
    padding: 5,
    fontSize: "1rem",
  },
  margin: { marginRight: 5 },
});

const MyMarker = ({ user }) => {
  const classes = useStyles();
  return (
    <Marker position={[user.position.lat, user.position.lon]}>
      <Tooltip className={classes.Tooltip}>
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          className={classes.Grid}
        >
          <Avatar
            src={
              user.avatar?.image || user.images ? user.images[0]?.image : null
            }
            alt={user.username}
            className={classes.margin}
          />
          {user.username}
        </Grid>
      </Tooltip>
    </Marker>
  );
};

export default MyMarker;
