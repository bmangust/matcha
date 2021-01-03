import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import defaultAvatar from "../../Images/default-avatar.png";
import { CONSTANTS } from "../../models/ws";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  Avatar: {
    marginRight: "1rem",
  },
  Text: {
    fontSize: "1rem",
  },
});

const NotificationListItem = ({ notification }) => {
  const classes = useStyles();

  const getText = (type) => {
    switch (type) {
      case CONSTANTS.UPDATE_TYPES.NEW_LIKE:
        return `${notification.user.name} has liked you`;
      case CONSTANTS.UPDATE_TYPES.NEW_LOOK:
        return `${notification.user.name} has visited you`;
      case CONSTANTS.UPDATE_TYPES.NEW_MATCH:
        return `Match with ${notification.user.name}!`;
      default:
        throw new Error("[NotificationListItem] No such type in notification");
    }
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Avatar
        className={classes.Avatar}
        src={
          notification.user?.avatar?.image ||
          notification.user?.images[0]?.image ||
          defaultAvatar
        }
      />
      <Typography className={classes.Text}>
        {getText(notification.type)}
      </Typography>
    </Grid>
  );
};

export default NotificationListItem;
