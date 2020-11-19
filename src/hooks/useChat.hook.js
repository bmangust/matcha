// import { host, port } from "../setupProxy";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Chat, Message, WSmessage } from "../store/ws";
import { api } from "../axios";
import { socket } from "./useWS.hook";

export const useChat = () => {
  const myId = useSelector((state) => state.general.id);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);

  const handleChatMessage = (res) => {
    if (res.messageType === WSmessage.NEW_CHAT) {
      const chatID = res.payload.id;
      const exists = chats.find((chat) => chatID === chat.id);
      if (!exists) setChats([...chats, chatID]);
    } else if (res.messageType === WSmessage.NEW_MESSAGE) {
      // show new message
    } else if (res.messageType === WSmessage.EDIT_MESSAGE) {
      // find and edit message
    } else if (res.messageType === WSmessage.DELETE_MESSAGE) {
      // find and delete message
    }
  };

  const getChatsInfoWS = async () => {
    console.log("[getChatsInfoWS]", chats);
    const res = await getChatsInfo();
    if (res) setChats(res);
  };

  const newChat = (id) => {
    console.log("newChat");
    const chat = new Chat({ userIds: [id, myId] });
    const newChat = new WSmessage({ messageType: 100, payload: chat });
    send(newChat);
  };

  const newMessage = (recepient, text) => {
    console.log("newMessage");
    const ms = new Message({ sender: myId, recepient, text });
    const wsMessage = new WSmessage({
      messageType: 1,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  const editMessage = (id, recepient, text) => {
    console.log("editMessage");
    const ms = new Message({ sender: myId, id, recepient, text });
    const wsMessage = new WSmessage({
      messageType: 2,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  const deleteMessage = (id, recepient, text) => {
    console.log("editMessage");
    const ms = new Message({ sender: myId, id, recepient, text });
    const wsMessage = new WSmessage({
      messageType: 3,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  const send = (message) => {
    console.log(JSON.stringify(message));
    socket.send(JSON.stringify(message));
  };

  return {
    chats,
    newChat,
    newMessage,
    getChatsInfoWS,
    setChat,
    handleChatMessage,
  };
};

export const getChatsInfo = async () => {
  const res = await api("chat");
  console.log(res.data);
  return res.data.data;
};

export const createChat = async (id) => {
  const res = await api.post({ id });
  console.log(res.data);
  return res.data.data;
};
