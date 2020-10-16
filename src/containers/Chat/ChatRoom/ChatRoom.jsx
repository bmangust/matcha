import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import SendForm from "./SendForm/SendForm";

const useStyles = makeStyles({
  Send: {
    marginTop: "auto",
    marginBottom: "70px",
  },
  Messages: {
    flexGrow: 2,
  },
  Header: {
    marginTop: "30px",
  },
  Container: {
    minHeight: "91vh",
  },
});

const ChatRoom = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={1}
      className={classes.Container}
    >
      <Grid item className={classes.Messages}>
        Messages
      </Grid>
      <Grid item className={classes.Send}>
        <SendForm />
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
