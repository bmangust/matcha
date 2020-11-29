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
      if (payload && payload.length) {
        state.chats = [...payload];
      }
    },
    addChat(state, { payload }) {
      if (!state.chats.find((chat) => chat.id === payload.id)) {
        state.chats.push(payload);
      }
    },
    removeChat(state, { payload }) {
      state.chats = state.chats.filter((chat) => chat.id !== payload.id);
    },
    setChat(state, { payload }) {
      state.chat = payload
        ? state.chats.find((ch) => ch.id === payload.id)
        : null;
    },
    updateMessage(state, { payload }) {
      if (!state.chat) {
        const chat = state.chats.find((ch) => ch.id === payload.chatId);
        state.chat = chat;
      }
      console.log(current(state.chat));

      const message = state.chat.messages.find((msg) => msg.id === payload.id);
      if (message) {
        Object.keys(message).forEach((key) => (message[key] = payload[key]));
      } else {
        state.chat.messages.push({ ...payload });
      }
    },
    // readAllChatMessages(state, { payload }) {
    //   const { chatId, messages } = { ...payload };
    //   const chat = state.chats;
    // },
    setDeleteMessage(state, { payload }) {
      const messageIndex = state.chat.messages.findIndex(
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
      state.chat.messages = payload;
    },
    setChatById(state, { payload }) {
      const chat = state.chats.find((chat) => chat.id === payload);
      state.chat = chat;
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
