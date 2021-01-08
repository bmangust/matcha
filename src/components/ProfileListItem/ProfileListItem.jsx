import { makeStyles, Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import defaultAvatar from "../../Images/default-avatar.png";

const useStyles = makeStyles((theme) => ({
  Avatar: {
    marginRight: "1rem",
  },
  Text: {
    fontSize: "1.5rem",
  },
  SecondaryText: {
    fontSize: "1.2rem",
    color: theme.palette.grey[500],
  },
}));

const ProfileListItem = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Avatar
        className={classes.Avatar}
        src={
          user?.avatar?.image || user?.images
            ? user.images[0]?.image
            : defaultAvatar
        }
      />
      <Grid container direction="column">
        <Typography
          className={classes.Text}
        >{`${user.name} ${user.surname}`}</Typography>
        <Typography
          className={classes.SecondaryText}
        >{`${user.age} years. ${user.city}, ${user.country}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileListItem;
