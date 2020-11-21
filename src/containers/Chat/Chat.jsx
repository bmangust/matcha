import { makeStyles, Container, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useChat } from "../../hooks/useChat.hook";

const useStyles = makeStyles({
  Container: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
});

const Chat = (props) => {
  const classes = useStyles();
  const chats = useSelector((state) => state.chat.chats);
  const { getChatsInfo, selectChat, createChat, getChatInfo } = useChat();
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    getChatsInfo();
  }, []);

  const handleChatSelect = (id, chatId) => {
    // console.log(id);
    selectChat(id, chatId);
    props.history.push(`/chat/${chatId}`);
  };
  // console.log(chats);

  return (
    <Container className={classes.Container}>
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
      <Container>
        <Button onClick={() => createChat(id)}>Create chat</Button>
        <Button onClick={() => getChatsInfo()}>Get chats info</Button>
        <input onChange={handleChange} value={id} />
        <Button onClick={() => getChatInfo(id)}>Get chat info</Button>
      </Container>
    </Container>
  );
};

export default Chat;
