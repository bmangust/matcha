import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { backgroundColor, primaryColor } from "../../../../theme";

const useStyles = makeStyles({
  ContainerLeft: {
    width: "100%",
    "& $Companion": {
      borderRadius: "5px 30px 30px 30px",
    },
  },
  ContainerRight: {
    width: "100%",
    justifyContent: "flex-end",
    "& $Self": {
      borderRadius: "30px 30px 5px 30px",
    },
  },
  Companion: {
    padding: "1rem",
    marginLeft: "1rem",
    maxWidth: "60%",
    backgroundColor: backgroundColor.foreground,
  },
  Self: {
    padding: "1rem",
    marginLeft: "1rem",
    maxWidth: "60%",
    backgroundColor: primaryColor.light,
  },
  Typography: {
    fontSize: "1rem",
  },
  "@media (max-width: 600px)": {
    Avatar: {
      display: "none",
    },
    Self: {
      maxWidth: "100%",
    },
    Companion: {
      maxWidth: "100%",
    },
  },
});

const Message = (props) => {
  const classes = useStyles();
  const { self, text, image, name } = { ...props };

  const paper = self ? classes.Self : classes.Companion;

  return (
    <Grid
      container
      className={self ? classes.ContainerRight : classes.ContainerLeft}
    >
      {self ? null : (
        <Avatar className={classes.Avatar} src={image} alt={name} />
      )}
      <Paper elevation={1} className={paper}>
        <Grid container>
          <Typography className={classes.Typography}>{text}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Message;
