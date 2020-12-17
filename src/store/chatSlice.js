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
    deleteChat(state, { payload }) {
      state.chats = state.chats?.filter((chat) => chat.id !== payload.id);
    },
    setChat(state, { payload }) {
      console.log(payload);
      if (!state.chats.length) return;
      if (!payload) {
        state.chat = null;
        return;
      }
      // just to be sure that chat exsist
      // actually we can just set chat to payload.id
      const chat = state.chats.find((ch) => ch.id === payload.id);
      console.log(chat);
      state.chat = chat ? chat.id : null;
    },
    setChatByUserId(state, { payload }) {
      if (!payload || state.chats.length === 0) return;
      const chat = state.chats.find((chat) =>
        chat.userIds.includes(payload.id)
      );
      state.chat = chat && chat.id;
    },
    addMessage(state, { payload }) {
      if (!payload) return;
      const chatIdx = state.chats.findIndex(
        (chat) => chat.id === payload.chatId
      );
      if (chatIdx < 0) {
        console.log("[addMessage reducer] chat not found", payload);
        return;
      }
      if (state.chats[chatIdx].messages.find((msg) => msg.id === payload.id))
        return;
      state.chats[chatIdx].messages.push(payload);
    },
    updateMessage(state, { payload }) {
      console.log(payload);
      const selectedChatId =
        state.chat || state.chats.find((ch) => ch.id === payload.chatId)?.id;
      if (!selectedChatId) {
        console.log("[updateMessage] chat not found. payload:", payload);
        return;
      }

      const chatIdx = state.chats.findIndex(
        (chat) => chat.id === selectedChatId
      );
      const msgIdx = state.chats[chatIdx].messages.findIndex(
        (msg) => msg.id === payload.id
      );

      console.log(`chatIdx: ${chatIdx}, msgIdx: ${msgIdx}`);
      if (msgIdx === -1) {
        state.chats[chatIdx].messages.push(payload);
      } else {
        state.chats[chatIdx].messages[msgIdx].text = payload.text;
        state.chats[chatIdx].messages[msgIdx].status = payload.status;
      }
    },
    deleteMessage(state, { payload }) {
      const selectedChatId =
        state.chat || state.chats.find((ch) => ch.id === payload.chatId)?.id;
      const chatIdx = state.chats.findIndex(
        (chat) => chat.id === selectedChatId
      );
      const messageIndex = state.chats[chatIdx].messages.findIndex(
        (msg) => msg.id === payload.id
      );
      if (messageIndex !== -1) {
        state.chat.messages.slpice(messageIndex, 1);
      }
    },
    upadateChatMessages(state, { payload }) {
      if (!state.chat) return;
      const chatIdx = state.chats.findIndex((chat) => chat.id === state.chat);
      state.chats[chatIdx].messages = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setChat,
  setChats,
  setChatByUserId,
  deleteChat,
  addChat,
  resetState,
  addMessage,
  updateMessage,
  deleteMessage,
  upadateChatMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
