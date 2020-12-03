import { useDispatch, useSelector } from "react-redux";
import { Chat, Message, WSmessage, CONSTANTS } from "../store/ws";
import { api } from "../axios";
import { send } from "./useWS.hook";
import {
  setCompanion,
  setHeader,
  setParent,
  showBackButton,
} from "../store/UISlice";
import {
  setChat,
  setChats,
  addChat,
  updateMessage,
  setDeleteMessage,
} from "../store/chatSlice";
import { loadUsers } from "../store/usersSlice";
import { useNotifications } from "./useNotifications";
import { useLocation } from "react-router-dom";

export const useChat = () => {
  const myId = useSelector((state) => state.general.id);
  const users = useSelector((state) => state.users.users);
  const companion = useSelector((state) => state.UI.companion);
  const location = useLocation();
  const { chats, chat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const notif = useNotifications();

  /**
   * Fetches and returns chat info
   * @param {string} chatId
   */
  const getChatInfo = async (chatId) => {
    try {
      const chatInfo = await api(`chat/${chatId}`);
      console.log("[getChatInfo]", chatInfo.data);
      return chatInfo.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  /**
   * Creates chat
   * @param {string} userId user id to chat with
   */
  const createChat = async (userId) => {
    console.log("newChat");
    const chat = new Chat({ userIds: [userId, myId] });
    try {
      const res = await api.post("chat", chat);
      console.log(res.data);
      if (res.data.status) {
        const chatInfo = await getChatInfo(res.data.data);
        if (chatInfo.status) {
          dispatch(addChat(chatInfo.data));
          dispatch(setChat(chatInfo.data));
        }
      }
      return res.data.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const loadRecipients = () => {
    const userIds = chats.map((chat) => chat.userIds.find((id) => id !== myId));
    dispatch(loadUsers(new Set(userIds)));
  };

  const readMessage = (message) => {
    const readMessage = { ...message };
    readMessage.state = CONSTANTS.MESSAGE.READ_MESSAGE;
    console.log(readMessage);
    send(
      new WSmessage({
        messageType: CONSTANTS.WS.EDIT_MESSAGE,
        payload: readMessage,
      })
    );
    dispatch(updateMessage(readMessage));
  };

  const showNotif = (message) => {
    console.log(`[showNotif] location path: ${location.pathname}`);
    const pathMatch = location.pathname.match(message.chatId);
    console.log(pathMatch);
    if (pathMatch && pathMatch[0] !== "") return;
    const user =
      message.sender !== myId
        ? users.find((user) => user.id === message.sender)
        : null;
    const username = user ? `${user.username}` : "Anonim";
    console.log(`[showNotif] username: ${username}`);
    if (username) {
      notif(`${username}: ${message.text}`);
    }
  };

  const handleChatMessage = async (res) => {
    console.log("[handleChatMessage]", res);
    if (res.messageType === CONSTANTS.WS.NEW_CHAT) {
      const chatID = res.payload.id;
      const chatData = await getChatInfo(chatID);
      if (chatData.status) dispatch(addChat(chatData.data));
      const exists = chats.find((chat) => chatID === chat.id);
      console.log("[handleChatMessage]", "chatID", "chatData", "exists");
      console.log(chatID, chatData, exists);
      if (!exists) {
        // should never happen
        console.log(
          "chat not found. actually this should never be visible",
          chats
        );
      }
    } else if (res.messageType === CONSTANTS.WS.NEW_MESSAGE) {
      // show new message
      console.log("[handleChatMessage] new message");
      showNotif(res.payload);
      dispatch(updateMessage(res.payload));
    } else if (res.messageType === CONSTANTS.WS.EDIT_MESSAGE) {
      console.log("[handleChatMessage] edit message");
      showNotif(res.payload);
      dispatch(updateMessage(res.payload));
    } else if (res.messageType === CONSTANTS.WS.DELETE_MESSAGE) {
      // find and delete message
    }
  };

  const getChatsInfo = async () => {
    console.log("[getChatsInfoWS]", chats);
    try {
      const res = await api("chat");
      console.log(res.data);
      if (res.data.status) {
        loadRecipients(res.data.data);
        dispatch(setChats(res.data.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Tries to find exsiting chat by its ID or recipient ID
   * If failes - creates new chat
   * @param {string} userId user to chat with
   * @param {string} chatId if known
   */
  const selectChat = async (userId, chatId = null) => {
    console.log(chats);
    if (!chats || chats.length === 0) await getChatsInfo();
    const selectedCompanion = companion || users.find((e) => e.id === userId);
    if (!selectedCompanion) {
      dispatch(loadUsers([userId]));
    }
    let selectedChat = chatId ? chats.find((chat) => chat.id === chatId) : null;
    if (!selectedChat) {
      selectedChat = chats.find((chat) =>
        chat.userIds.find((id) => userId === id)
      );
    }
    console.log(selectedCompanion);
    console.log(selectedChat);
    if (!selectedChat) {
      createChat(userId);
      return null;
    } else {
      dispatch(setChat(selectedChat));
      dispatch(setCompanion({ companion: selectedCompanion }));
      dispatch(setParent({ parent: "chat" }));
      dispatch(setHeader({ header: selectedCompanion?.name || null }));
      dispatch(showBackButton());
      return selectedCompanion;
    }
  };

  const newMessage = (recipient, text) => {
    const message = new Message({
      sender: myId,
      recipient,
      text,
      chatId: chat,
    });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.MESSAGE.SENT_MESSAGE,
      payload: message,
    });
    dispatch(updateMessage(message));
    send(wsMessage);
  };

  const editMessage = (id, recipient, text) => {
    console.log("editMessage");
    const message = new Message({
      sender: myId,
      id,
      recipient,
      text,
      chatId: chat,
    });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.WS.EDIT_MESSAGE,
      payload: message,
    });
    dispatch(updateMessage(message));
    send(wsMessage);
  };

  const deleteMessage = (id, recipient, text) => {
    console.log("deleteMessage");
    const message = new Message({
      sender: myId,
      id,
      recipient,
      text,
      chatId: chat,
    });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.WS.DELETE_MESSAGE,
      payload: message,
    });
    dispatch(setDeleteMessage(message));
    send(wsMessage);
  };

  return {
    selectChat,
    createChat,
    newMessage,
    editMessage,
    deleteMessage,
    getChatInfo,
    getChatsInfo,
    readMessage,
    handleChatMessage,
  };
};
