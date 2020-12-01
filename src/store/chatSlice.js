import { current } from "@reduxjs/toolkit/node_modules/immer";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  chat: null,
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, { payload }) {
      console.log(payload);
      if (payload && payload.length) {
        console.log("payload is not null");
        state.chats = payload.map((chat) => ({
          ...chat,
          messages: chat.messages || [],
        }));
      }
    },
    addChat(state, { payload }) {
      console.log(payload);
      if (!state.chats.find((chat) => chat.id === payload.id)) {
        console.log("chat not found, adding", payload);
        state.chats.push({ ...payload, messages: payload.messages || [] });
      }
    },
    removeChat(state, { payload }) {
      state.chats = state.chats?.filter((chat) => chat.id !== payload.id);
    },
    setChat(state, { payload }) {
      const chat = payload
        ? state.chats.find((ch) => ch.id === payload.id)
        : null;
      state.chat = chat?.id || null;
    },
    updateMessage(state, { payload }) {
      const selectedChat =
        state.chat || state.chats.find((ch) => ch.id === payload.chatId)?.id;
      if (!selectedChat) {
        console.log("[updateMessage] chat not found. payload:", payload);
        return;
      }

      const chatIdx = state.chats.findIndex((chat) => chat.id === selectedChat);
      const msgIdx = state.chats[chatIdx].messages.findIndex(
        (msg) => msg.id === payload.id
      );

      console.log(`chatIdx: ${chatIdx}, msgIdx: ${msgIdx}`);
      if (msgIdx === -1) {
        state.chats[chatIdx].messages.push({ ...payload });
      } else {
        state.chats[chatIdx].messages = [
          ...state.chats[chatIdx].messages.slice(0, msgIdx),
          { ...payload },
          ...state.chats[chatIdx].messages.slice(msgIdx + 1),
        ];
      }
    },
    setDeleteMessage(state, { payload }) {
      const selectedChat =
        state.chat || state.chats.find((ch) => ch.id === payload.chatId)?.id;
      const chatIdx = state.chats.findIndex((chat) => chat.id === selectedChat);
      const messageIndex = state.chats[chatIdx].messages.findIndex(
        (msg) => msg.id === payload.id
      );
      if (messageIndex !== -1) {
        state.chat.messages = [
          ...state.chat.messages.slice(0, messageIndex),
          ...state.chat.messages.slice(messageIndex + 1),
        ];
      }
    },
    upadateChatMessages(state, { payload }) {
      if (!state.chat) return;
      const chatIdx = state.chats.findIndex((chat) => chat.id === state.chat);
      state.chats[chatIdx].messages = payload;
    },
    setChatById(state, { payload }) {
      state.chat = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setChat,
  setChats,
  setChatById,
  removeChat,
  addChat,
  resetState,
  updateMessage,
  setDeleteMessage,
  upadateChatMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
