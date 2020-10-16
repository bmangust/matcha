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

const ChatList = (props) => {
  const classes = useStyles();
  const { chats, handleChatSelect } = { ...props };
  return (
    <List className={classes.List}>
      {chats.map(({ id, name, image, messages, newMessages }) => (
        <ListItem
          className={classes.ListItem}
          button
          onClick={() => handleChatSelect(id)}
          key={id}
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
            secondary={messages[messages.length - 1]?.text || ""}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
