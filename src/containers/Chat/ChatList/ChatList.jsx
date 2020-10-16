import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";

const ChatList = (props) => {
  const { chats, handleChatSelect } = { ...props };
  return (
    <List>
      {chats.map(({ id, name, image, lastMessage, newMessages }) => (
        <ListItem button onClick={() => handleChatSelect(id)} key={id}>
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
          <ListItemText primary={name} secondary={lastMessage} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
