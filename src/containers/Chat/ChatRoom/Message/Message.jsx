import {
  Avatar,
  Badge,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { DoneAllRounded, DoneRounded } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../../../models/ws";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
  theme,
} from "../../../../theme";

const useStyles = makeStyles({
  Container: {
    width: "100%",
    justifyContent: ({ self }) => (self ? "flex-end" : "flex-start"),
    "& $Paper": {
      borderRadius: ({ self }) =>
        self ? "30px 30px 5px 30px" : "5px 30px 30px 30px",
    },
  },
  Paper: {
    padding: "0.4rem 1.5rem",
    marginLeft: "1rem",
    maxWidth: "60%",
    backgroundColor: ({ self }) =>
      self ? primaryColor.light : backgroundColor.foreground,
  },
  Typography: {
    fontSize: "1rem",
  },
  Info: {
    justifyContent: ({ self }) => (self ? "flex-end" : "flex-start"),
  },
  Date: {
    fontSize: "0.7rem",
    color: primaryColor.contrastTextLighter,
  },
  Icon: {
    marginLeft: "0.3rem",
    fontSize: "0.7rem",
    color: ({ status }) =>
      status === CONSTANTS.MESSAGE_STATUS.STATUS_NEW
        ? primaryColor.contrastTextLighter
        : secondaryColor.main,
  },
  Badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    transform: "translate(0px, 0px)",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@media (max-width: 600px)": {
    Avatar: {
      display: "none",
    },
    Paper: {
      maxWidth: "100%",
      padding: "0.3rem 1rem",
    },
  },
});

const getDate = (date) => {
  const d = new Date(date);
  const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  return `${d.getHours()}:${minutes}`;
};

const Message = (props) => {
  const { self, text, image, name, date, status } = { ...props };
  const isOnline = useSelector((state) => state.UI.companion.isOnline);
  const classes = useStyles({ self, status });

  return (
    <Grid container className={classes.Container}>
      {self ? null : (
        <Badge
          color="primary"
          variant="dot"
          badgeContent={isOnline ? 1 : 0}
          classes={{ badge: classes.Badge }}
        >
          <Avatar className={classes.Avatar} src={image} alt={name} />
        </Badge>
      )}
      <Paper elevation={1} className={classes.Paper}>
        <Grid container>
          <Typography className={classes.Typography}>{text}</Typography>
        </Grid>
        <Grid className={classes.Info} container alignItems="center">
          <Typography component="span" className={classes.Date}>
            {getDate(date)}
          </Typography>
          {status === CONSTANTS.MESSAGE_STATUS.STATUS_READ ? (
            <DoneAllRounded className={classes.Icon} />
          ) : (
            <DoneRounded className={classes.Icon} />
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Message;
