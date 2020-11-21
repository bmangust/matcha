import { useDispatch, useSelector } from "react-redux";
import { Chat, Message, WSmessage, CONSTANTS } from "../store/ws";
import { api } from "../axios";
import { send } from "./useWS.hook";
import { setCompanion, setHeader, showBackButton } from "../store/UISlice";
import { setChat, setChats, addChat } from "../store/chatSlice";
import { loadUsers } from "../store/usersSlice";

export const useChat = () => {
  const myId = useSelector((state) => state.general.id);
  const users = useSelector((state) => state.users.users);
  const companion = useSelector((state) => state.UI.companion);
  const { chats, chat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  /**
   * Fetches and returns chat info
   * @param {string} chatId
   */
  const getChatInfo = async (chatId) => {
    const chatInfo = await api(`chat/${chatId}`);
    console.log(chatInfo.data);
    return chatInfo.data;
  };

  /**
   * Creates chat
   * @param {string} userId user id to chat with
   */
  const createChat = async (userId) => {
    console.log("newChat");
    const chat = new Chat({ userIds: [userId, myId] });
    const res = await api.post("chat", chat);
    console.log(res.data);
    if (res.data.status) {
      const chatInfo = await getChatInfo(res.data.data);
      if (chatInfo.status) dispatch(addChat(chatInfo.data));
    }
    return res.data.data;
  };

  const loadRecipients = () => {
    const userIds = chats.map((chat) => chat.userIds.find((id) => id !== myId));
    dispatch(loadUsers(new Set(userIds)));
  };

  const handleChatMessage = (res) => {
    console.log("[handleChatMessage");
    if (res.messageType === CONSTANTS.NEW_CHAT) {
      const chatID = res.payload.id;
      const exists = chats.find((chat) => chatID === chat.id);
      getChatInfo(chatID);
      console.log(chatID, exists);
      if (!exists) {
        // should never happen
      }
    } else if (res.messageType === CONSTANTS.NEW_MESSAGE) {
      // show new message
    } else if (res.messageType === CONSTANTS.EDIT_MESSAGE) {
      // find and edit message
    } else if (res.messageType === CONSTANTS.DELETE_MESSAGE) {
      // find and delete message
    }
  };

  const getChatsInfo = async () => {
    console.log("[getChatsInfoWS]", chats);
    const res = await api("chat");
    console.log(res.data);
    if (res.data.status) {
      loadRecipients(res.data.data);
      dispatch(setChats(res.data.data));
    }
  };

  // const newChat = (id) => {
  //   console.log("newChat");
  //   const chat = new Chat({ userIds: [id, myId] });
  //   const newChat = new WSmessage({ messageType: 100, payload: chat });
  //   send(newChat);
  //   // getChatsInfo();
  // };

  /**
   * Tries to find exsiting chat by its ID or recipient ID
   * If failes - creates new chat
   * @param {string} userId user to chat with
   * @param {string} chatId if known
   */
  const selectChat = async (userId, chatId = null) => {
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
      dispatch(setHeader({ header: selectedCompanion?.name || null }));
      dispatch(showBackButton());
      return selectedCompanion;
    }
  };

  const newMessage = (recepient, text) => {
    console.log("newMessage");
    const ms = new Message({ sender: myId, recepient, text });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.SENT_MESSAGE,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  const editMessage = (id, recepient, text) => {
    console.log("editMessage");
    const ms = new Message({ sender: myId, id, recepient, text });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.EDIT_MESSAGE,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  const deleteMessage = (id, recepient, text) => {
    console.log("editMessage");
    const ms = new Message({ sender: myId, id, recepient, text });
    const wsMessage = new WSmessage({
      messageType: CONSTANTS.DELETE_MESSAGE,
      payload: ms,
      toChat: chat,
    });
    send(wsMessage);
  };

  return {
    // newChat,
    selectChat,
    createChat,
    newMessage,
    getChatInfo,
    getChatsInfo,
    handleChatMessage,
  };
};
