import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { chatApi } from "../axios";
import { Chat, CONSTANTS, Message, WSmessage } from "../models/ws";
import {
  addChat,
  setChats,
  deleteChat,
  addMessage,
  updateMessage,
  deleteMessage,
  setChatByUserId,
} from "../store/chatSlice";
import { useNotifications } from "./useNotifications";
import { send } from "./useWS.hook";

export const useChat = () => {
  const myId = useSelector((state) => state.general.id);
  const dispatch = useDispatch();
  const location = useLocation();
  const users = useSelector((state) => state.users.users);
  const { chat } = useSelector((state) => state.chat);
  const notif = useNotifications();

  const getChatsInfo = async () => {
    try {
      const res = await chatApi("chats", {
        params: { id: myId },
      });
      console.log("[getChatsInfo]", res);
      if (res.data.status) {
        dispatch(setChats(res.data.data));
      }
    } catch (e) {}
  };
  /**
   * Creates chat
   * @param {string} userId user id to chat with
   */
  const createChat = async (userId) => {
    console.log("newChat");
    const chat = new Chat({ userIds: [userId, myId] });
    try {
      const res = await chatApi.post("chat", chat);
      console.log(res.data);
      if (res.data.status) {
        await getChatsInfo();
      }
      return res.data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const selectChat = (userId) => {
    console.log("[selectChat]");
    dispatch(setChatByUserId({ id: userId }));
  };

  const handleChat = (wsMessage) => {
    console.log("[hadleChat]", wsMessage);
    if (wsMessage.type === CONSTANTS.CHAT_TYPES.NEW_CHAT) {
      // add new chat
      dispatch(addChat(wsMessage.payload));
    } else if (wsMessage.type === CONSTANTS.CHAT_TYPES.DELETE_CHAT) {
      dispatch(deleteChat(wsMessage.payload));
    }
  };

  const showNotif = (message) => {
    console.log(`[showNotif] location path: ${location.pathname}`);
    const pathMatch = location.pathname.match(message.chatId);
    console.log(pathMatch);
    if (pathMatch && pathMatch[0] !== "") return;
    const user = users.find((user) => user.id === message.sender);
    const username = user ? `${user.username}` : null;
    console.log(`[showNotif] username: ${username}`);
    if (username) {
      notif({ header: username, text: message.text });
    }
  };

  const handleMessage = (wsMessage) => {
    console.log("[hadleChat]", wsMessage);
    if (wsMessage.type === CONSTANTS.MESSAGE_TYPES.NEW_MESSAGE) {
      dispatch(addMessage(wsMessage.payload));
      // showNotif(wsMessage.payload);
    } else if (wsMessage.type === CONSTANTS.MESSAGE_TYPES.UPDATE_MESSAGE) {
      dispatch(updateMessage(wsMessage.payload));
    } else if (wsMessage.type === CONSTANTS.MESSAGE_TYPES.DELETE_MESSAGE) {
      dispatch(deleteMessage(wsMessage.payload));
    }
  };

  const newMsg = (recipient, text) => {
    const message = new Message({
      chatId: chat,
      sender: myId,
      recipient,
      text,
      status: CONSTANTS.MESSAGE_STATUS.STATUS_NEW,
    });
    const wsMessage = new WSmessage({
      type: CONSTANTS.MESSAGE_TYPES.NEW_MESSAGE,
      payload: message,
    });
    send(CONSTANTS.WS.MESSAGE, wsMessage);
  };

  const readMsg = (payload) => {
    const message = {
      ...payload,
      status: CONSTANTS.MESSAGE_STATUS.STATUS_READ,
    };
    dispatch(updateMessage(message));
    const wsMessage = new WSmessage({
      type: CONSTANTS.MESSAGE_TYPES.UPDATE_MESSAGE,
      payload: message,
    });
    send(CONSTANTS.WS.MESSAGE, wsMessage);
  };

  const updateMsg = (payload) => {
    const message = {
      ...payload,
      status: CONSTANTS.MESSAGE_STATUS.STATUS_READ,
    };
    const wsMessage = new WSmessage({
      type: CONSTANTS.MESSAGE_TYPES.UPDATE_MESSAGE,
      payload: message,
    });
    send(CONSTANTS.WS.MESSAGE, wsMessage);
  };

  return {
    getChatsInfo,
    createChat,
    selectChat,

    handleChat,
    handleMessage,

    newMsg,
    readMsg,
    updateMsg,
  };
};
