import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { DoneAllRounded, DoneRounded } from "@material-ui/icons";
import React from "react";
import { CONSTANTS } from "../../../../store/ws";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
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
    // textAlign: ({ self }) => (self ? "end" : "start"),
  },
  Icon: {
    marginLeft: "0.3rem",
    fontSize: "0.7rem",
    color: ({ state }) =>
      state === CONSTANTS.SENT_MESSAGE
        ? primaryColor.contrastTextLighter
        : secondaryColor.main,
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
  return `${d.getHours()}:${d.getMinutes()}`;
};

const Message = (props) => {
  const { self, text, image, name, date, state } = { ...props };
  const classes = useStyles({ self, state });

  return (
    <Grid container className={classes.Container}>
      {self ? null : (
        <Avatar className={classes.Avatar} src={image} alt={name} />
      )}
      <Paper elevation={1} className={classes.Paper}>
        <Grid container>
          <Typography className={classes.Typography}>{text}</Typography>
        </Grid>
        <Grid className={classes.Info} container alignItems="center">
          <Typography component="span" className={classes.Date}>
            {getDate(date)}
          </Typography>
          {state === CONSTANTS.READ_MESSAGE ? (
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
