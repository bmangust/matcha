import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useChat } from "../../../hooks/useChat.hook";
import { setChat } from "../../../store/chatSlice";
import { setCompanion } from "../../../store/UISlice";
import { borderRadius } from "../../../theme";

const useStyles = makeStyles({
  List: {
    width: "100%",
    textAlign: "center",
  },
  ListItem: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: borderRadius,
  },
  Username: {
    fontWeight: 800,
  },
  Text: {
    fontSize: "1rem",
  },
});

const ChatList = () => {
  const classes = useStyles();
  const chats = useSelector((state) => state.chat.chats);
  const users = useSelector((state) => state.users.users);
  const myId = useSelector((state) => state.general.id);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getChatsInfo } = useChat();

  useEffect(() => {
    getChatsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatSelect = (chatId, user) => {
    dispatch(setChat({ id: chatId }));
    dispatch(setCompanion({ companion: user }));
    history.push(`/chat/${chatId}`);
  };

  const chatList = chats.map((chat) => {
    const newChatItem = { ...chat };
    const recepient = newChatItem.userIds.find((id) => id !== myId);
    const user = users.find((user) => user.id === recepient);
    newChatItem.user = { ...user };
    return newChatItem;
  });

  return (
    <List className={classes.List}>
      {chatList.length ? (
        chatList.map((chat) => {
          console.log(chat);
          const { name, image, messages, newMessages } = { ...chat.user };
          return (
            <ListItem
              className={classes.ListItem}
              button
              onClick={() => handleChatSelect(chat.id, chat.user)}
              key={chat.id}
            >
              <Badge
                color="secondary"
                overlap="circle"
                variant="dot"
                badgeContent={newMessages || 0}
              >
                <ListItemAvatar>
                  <Avatar src={image} alt={name} />
                </ListItemAvatar>
              </Badge>
              <ListItemText
                primary={name}
                primaryTypographyProps={{ className: classes.Username }}
                secondary={
                  messages ? messages[messages.length - 1]?.text || "" : ""
                }
              />
            </ListItem>
          );
        })
      ) : (
        <Typography className={classes.Text}>No chats yet</Typography>
      )}
    </List>
  );
};

export default ChatList;
