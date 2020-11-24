import { makeStyles, Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import defaultAvatar from "../../Images/default-avatar.png";

const useStyles = makeStyles({
  Avatar: {
    marginRight: "1rem",
  },
  Text: {
    fontFamily: "Righteous",
    fontSize: "1.5rem",
  },
});

const ProfileListItem = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Avatar
        className={classes.Avatar}
        src={user?.avatar?.image || defaultAvatar}
      />
      <Typography className={classes.Text}>{user.username}</Typography>
    </Grid>
  );
};

export default ProfileListItem;
