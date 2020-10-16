import { makeStyles, Container } from "@material-ui/core";
import React from "react";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { showBackButton, setHeader } from "../../store/UISlice";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  Container: {
    overflow: "hidden",
  },
});

const Chat = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const companion = useSelector((state) => state.UI.companion);
  const companions = [
    {
      id: 0,
      name: "Alex",
      lastMessage: "Hello, Max",
      image: null,
      newMessages: 3,
    },
    {
      id: 1,
      name: "Katie",
      lastMessage: "Are you there?",
      image: null,
      newMessages: 0,
    },
  ];

  console.log(props);

  const handleChatSelect = (id) => {
    console.log(id);
    const selectedCompanion = companions.find((e) => e.id === id);
    console.log(selectedCompanion);
    dispatch(setHeader({ header: selectedCompanion?.name || null }));
    dispatch(showBackButton());
    props.history.push(`/chat/${id}`);
  };

  return (
    <Container className={classes.Container}>
      <Switch>
        {companions.map((el) => (
          <Route
            key={el.id}
            path={`/chat/${el.id}`}
            render={() => <ChatRoom companion={companion} />}
          />
        ))}
        <Route
          path="/chat"
          exact
          render={() => (
            <ChatList chats={companions} handleChatSelect={handleChatSelect} />
          )}
        />
      </Switch>
    </Container>
  );
};

export default Chat;
