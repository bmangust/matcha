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
import { CONSTANTS } from "../../../models/ws";
import { setChat } from "../../../store/chatSlice";
import { setCompanion } from "../../../store/UISlice";
import { borderRadius } from "../../../theme";

const useStyles = makeStyles((theme) => ({
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
  Secondary: {
    display: "-webkit-box",
    lineClamp: 1,
    boxOrient: "vertical",
    overflow: "hidden",
  },
  Status: { border: `3px solid theme.palette.grey[500]` },
  Online: {
    backgroundColor: theme.palette.success.main,
  },
  Badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
  NewMessages: {
    padding: "5px 8px",
    borderRadius: 20,
    backgroundColor: theme.palette.primary.light,
  },
}));

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
          const { name, avatar, images, isOnline } = {
            ...chat.user,
          };
          const { messages } = { ...chat };
          const newMessages = messages.filter(
            (el) => el.status !== CONSTANTS.MESSAGE_STATUS.STATUS_READ
          );
          console.log(chat);
          const img = avatar?.image || images[0]?.image || null;
          return (
            <ListItem
              className={classes.ListItem}
              button
              onClick={() => handleChatSelect(chat.id, chat.user)}
              key={chat.id}
            >
              <Badge
                color="primary"
                overlap="circle"
                variant="dot"
                badgeContent={isOnline ? 1 : 0}
                classes={{ badge: classes.Badge }}
              >
                <ListItemAvatar>
                  <Avatar src={img} alt={name} />
                </ListItemAvatar>
              </Badge>
              <ListItemText
                primary={name}
                primaryTypographyProps={{ className: classes.Username }}
                secondary={
                  messages ? messages[messages.length - 1]?.text || "" : ""
                }
                secondaryTypographyProps={{ className: classes.Secondary }}
              />
              {newMessages.length > 0 && (
                <div className={classes.NewMessages}>{newMessages.length}</div>
              )}
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
