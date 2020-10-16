import { makeStyles, Container } from "@material-ui/core";
import React from "react";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";
import { showBackButton, setHeader } from "../../store/UISlice";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles({
  Container: {
    overflow: "hidden",
  },
});

const Chat = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [companion, setCompanion] = React.useState(null);
  const companions = [
    {
      id: 0,
      name: "Alex",
      image: null,
      newMessages: 3,
      messages: [
        { id: 0, self: true, text: "Hello, Alex!" },
        { id: 1, self: true, text: "Are you ready?" },
        { id: 2, self: false, text: "Hello, Max. Yes, I am" },
      ],
    },
    {
      id: 1,
      name: "Katie",
      image: null,
      newMessages: 0,
      messages: [
        { id: 0, self: false, text: "Hello, Max!" },
        { id: 1, self: false, text: "Are you ready?" },
        { id: 2, self: true, text: "Hello, Katie. No, just a second" },
        {
          id: 3,
          self: false,
          text:
            "If true, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The prop is available to descendant components as the dense context.",
        },
        {
          id: 4,
          self: true,
          text:
            "This feature relies on CSS sticky positioning. Unfortunately it's not implemented by all the supported browsers. It defaults to disableSticky when not supported.",
        },
      ],
    },
  ];

  const handleChatSelect = (id) => {
    const selectedCompanion = companions.find((e) => e.id === id);
    setCompanion((prev) => selectedCompanion);
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
