import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  Grid: {
    overflow: "hidden",
    width: "100%",
  },
});

const Chat = () => {
  const classes = useStyles();
  const chats = useSelector((state) => state.chat.chats);

  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.Grid}
    >
      <Switch>
        {chats.map((el) => (
          <Route
            key={el.id}
            path={`/chat/${el.id}`}
            render={() => <ChatRoom />}
          />
        ))}
        <Route path="/chat" exact render={() => <ChatList />} />
      </Switch>
    </Grid>
  );
};

export default Chat;
