import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import defaultAvatar from "../../Images/default-avatar.png";
import { CONSTANTS } from "../../models/ws";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexWrap: "nowrap",
  },
  Avatar: {
    marginRight: "1rem",
  },
  Text: {
    fontSize: "1rem",
    marginLeft: "auto",
    flexGrow: 1,
  },
  Date: {
    fontSize: "0.8rem",
    color: theme.palette.grey[500],
  },
}));

const NotificationListItem = ({ notification }) => {
  const classes = useStyles();

  const getText = (type) => {
    switch (type) {
      case CONSTANTS.UPDATE_TYPES.NEW_LIKE:
        return `${notification.user.name} like you`;
      case CONSTANTS.UPDATE_TYPES.DELETE_LIKE:
        return `${notification.user.name} does not like you anymore`;
      case CONSTANTS.UPDATE_TYPES.NEW_LOOK:
        return `${notification.user.name} has visited you`;
      case CONSTANTS.UPDATE_TYPES.NEW_MATCH:
        return `Match with ${notification.user.name}!`;
      case CONSTANTS.UPDATE_TYPES.DELETE_MATCH:
        return `You have no match with ${notification.user.name} anymore`;
      case CONSTANTS.MESSAGE_TYPES.NEW_MESSAGE:
        return `You have unread messages`;
      default:
        throw new Error("[NotificationListItem] No such type in notification");
    }
  };

  const getTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).valueOf();

    // 24*60*60*1000
    if (time < today - 86400000) {
      return `${date.getDay()} ${date.getMonth()}`;
    } else if (time < today) {
      return `yesterday`;
    } else {
      return date.toTimeString().split(" ")[0];
    }
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Avatar
        className={classes.Avatar}
        src={
          notification.user?.avatar?.image || notification.user?.images
            ? notification.user.images[0]?.image
            : defaultAvatar
        }
      />
      <Typography className={classes.Text}>
        {getText(notification.type)}
      </Typography>
      <Typography className={classes.Date}>
        {getTime(notification.date)}
      </Typography>
    </Grid>
  );
};

export default NotificationListItem;
