import { makeStyles, Grid, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useChat } from "../../hooks/useChat.hook";

const useStyles = makeStyles({
  Grid: {
    overflow: "hidden",
    width: "100%",
  },
});

const Chat = (props) => {
  const classes = useStyles();
  const chats = useSelector((state) => state.chat.chats);
  const {
    getChatsInfo,
    selectChat,
    createChat,
    getChatInfo,
    newMessage,
  } = useChat();
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    getChatsInfo();
  }, []);

  const handleChatSelect = (id, chatId) => {
    // console.log(id, chatId);
    selectChat(id, chatId);
    props.history.push(`/chat/${chatId}`);
  };
  // console.log(chats);

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
        <Route
          path="/chat"
          exact
          render={() => (
            <ChatList chats={chats} handleChatSelect={handleChatSelect} />
          )}
        />
      </Switch>
      {/* chat debug */}
      <Grid container>
        <Button onClick={() => createChat(id)}>Create chat</Button>
        <Button onClick={() => getChatsInfo()}>Get chats info</Button>
        <TextField placeholder="id" onChange={handleIdChange} value={id} />
        <TextField
          placeholder="message"
          onChange={handleMessageChange}
          value={message}
        />
        <Button onClick={() => getChatInfo(id)}>Get chat info</Button>
        <Button onClick={() => newMessage(id, message)}>Send message</Button>
      </Grid>
    </Grid>
  );
};

export default Chat;
