import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

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
  },
  Username: {
    fontWeight: 800,
  },
});

const ChatList = ({ chats, handleChatSelect }) => {
  const classes = useStyles();
  const users = useSelector((state) => state.users.users);
  const myId = useSelector((state) => state.general.id);

  const chatList = chats.map((chat) => {
    const newChatItem = { ...chat };
    // console.log(newChatItem);
    const recepient = newChatItem.userIds.find((id) => id !== myId);
    const user = users.find((user) => user.id === recepient);
    newChatItem.user = { ...user };
    return newChatItem;
  });

  return (
    <List className={classes.List}>
      {chatList.map((chat) => {
        const chatId = chat.id;
        const { id, name, image, messages, newMessages } = { ...chat.user };
        return (
          <ListItem
            className={classes.ListItem}
            button
            onClick={() => handleChatSelect(id, chatId)}
            key={chatId}
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
      })}
    </List>
  );
};

export default ChatList;
