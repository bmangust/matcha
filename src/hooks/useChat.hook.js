import { useDispatch, useSelector, useStore } from "react-redux";
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
  const { chat } = useSelector((state) => state.chat);
  const { notif } = useNotifications();
  const store = useStore();

  const getChatsInfo = async () => {
    try {
      const res = await chatApi("chats", {
        params: { id: myId },
      });
      // console.log("[getChatsInfo]", res);
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
    // console.log("newChat");
    const chat = new Chat({ userIds: [userId, myId] });
    try {
      const res = await chatApi.post("chat", chat);
      // console.log(res.data);
      if (res.data.status) {
        await getChatsInfo();
      }
      return res.data.data;
    } catch (e) {
      notif("Server error when creating chat", "error");
      return null;
    }
  };

  const selectChat = (userId) => {
    // console.log("[selectChat]");
    dispatch(setChatByUserId({ id: userId }));
  };

  const handleChat = (wsMessage) => {
    console.log("[hadleChat]", wsMessage);
    if (wsMessage.type === CONSTANTS.CHAT_TYPES.NEW_CHAT) {
      dispatch(addChat(wsMessage.payload));
    } else if (wsMessage.type === CONSTANTS.CHAT_TYPES.DELETE_CHAT) {
      dispatch(deleteChat(wsMessage.payload));
    }
  };

  const showNotif = (message) => {
    const users = store.getState().users?.users;
    const pathMatch = window.location.pathname.match(message.chatId);
    if (pathMatch && pathMatch[0] !== "") return;
    const user = users && users.find((user) => user.id === message.sender);
    const username = user ? `${user.username}` : "new message";
    notif({ header: username, text: message.text });
  };

  const handleMessage = (wsMessage) => {
    // console.log("[hadleChat]", wsMessage);
    if (wsMessage.type === CONSTANTS.MESSAGE_TYPES.NEW_MESSAGE) {
      dispatch(addMessage(wsMessage.payload));
      showNotif(wsMessage.payload);
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
