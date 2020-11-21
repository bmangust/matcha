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
      state.chat = payload;
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
} = chatSlice.actions;

export default chatSlice.reducer;
