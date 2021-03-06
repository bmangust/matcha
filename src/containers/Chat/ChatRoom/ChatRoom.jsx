import { makeStyles, Grid, List, ListItem } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../../../hooks/useChat.hook";
import { CONSTANTS } from "../../../models/ws";
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

const ChatRoom = () => {
  const classes = useStyles();
  const { readMsg } = useChat();
  const messagesEndRef = useRef(null);
  const [mappedMessages, setMappedMessages] = useState([]);

  const { name, avatar, images } = useSelector((state) => state.UI.companion);
  const { chat, chats } = useSelector((state) => state.chat);
  const myId = useSelector((state) => state.general.id);

  const messages = chats.find((ch) => ch.id === chat).messages;
  console.log(`[ChatRoom] mappedMessages`, mappedMessages);
  console.log(`[ChatRoom] messages`, messages);

  const formatedMessages = useMemo(
    () =>
      !messages || !messages.length
        ? []
        : messages.map((el) => (
            <ListItem key={el.id} className={classes.ListItem}>
              <Message
                self={el.sender === myId}
                text={el.text}
                image={
                  avatar?.image || (images && images.length)
                    ? images[0]?.image
                    : null
                }
                name={name}
                date={el.date}
                status={el.status}
              />
            </ListItem>
          )),
    [avatar, classes.ListItem, images, messages, myId, name]
  );

  useEffect(() => {
    setMappedMessages(formatedMessages);
  }, [formatedMessages]);

  useEffect(() => {
    const readAllMessages = () => {
      messages.forEach((message) => {
        if (message.sender !== myId) {
          switch (message.status) {
            case CONSTANTS.MESSAGE_STATUS.STATUS_NEW:
            case CONSTANTS.MESSAGE_STATUS.STATUS_DELIVERED:
              readMsg(message);
              return;
            case CONSTANTS.MESSAGE_STATUS.STATUS_READ:
            default:
              return;
          }
        }
      });
    };
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    if (!messages || !messages.length) return;
    readAllMessages();
    scrollToBottom();
  }, [messages, myId, readMsg]);

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={1}
      className={classes.Container}
    >
      <List className={classes.List}>
        {mappedMessages.length ? mappedMessages : "No messages yet"}
        <div ref={messagesEndRef} />
      </List>
      <Grid item className={classes.SendForm}>
        <SendForm />
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
