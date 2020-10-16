import { makeStyles, Grid, List, ListItem } from "@material-ui/core";
import React from "react";
import Message from "./Message/Message";
import SendForm from "./SendForm/SendForm";

const useStyles = makeStyles({
  Container: {
    minHeight: "91vh",
  },
  List: {
    flexGrow: 2,
    width: "70%",
    maxHeight: "70vh",
    margin: "0 auto",
    overflowY: "auto",
  },
  ListItem: {
    margin: "20px auto",
  },
  Header: {
    marginTop: "30px",
  },
  SendForm: {
    marginTop: "auto",
    marginBottom: "70px",
  },
});

const ChatRoom = (props) => {
  const { companion } = { ...props };
  const { name, messages, image } = { ...companion };
  const classes = useStyles();
  const renderedMessages = messages
    ? messages.map((el) => (
        <ListItem key={el.id} className={classes.ListItem}>
          <Message self={el.self} text={el.text} image={image} name={name} />
        </ListItem>
      ))
    : "No messages yet";
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={1}
      className={classes.Container}
    >
      <List className={classes.List}>{renderedMessages}</List>
      <Grid item className={classes.SendForm}>
        <SendForm />
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
