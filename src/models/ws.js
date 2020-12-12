import { v4 as uuid } from "uuid/dist";

export class WSmessage {
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload || null;
  }
}

export const CONSTANTS = {
  WS: {
    CHAT: "CHAT",
    MESSAGE: "MESSAGE",
  },
  CHAT: {
    NEW_CHAT: "NEW_CHAT",
    DELETE_CHAT: "DELETE_CHAT",
  },
  MESSAGE: {
    NEW_MESSAGE: "NEW_MESSAGE",
    DELIVERED_MESSAGE: "DELIVERED_MESSAGE",
    READ_MESSAGE: "READ_MESSAGE",
    EDIT_MESSAGE: "EDIT_MESSAGE",
    DELETE_MESSAGE: "DELETE_MESSAGE",
  },
};

export class Chat {
  constructor({ id, userIds, messages }) {
    this.id = id || "";
    this.userIds = userIds;
    this.messages = messages || [];
  }
}

export class Message {
  constructor({ id, sender, recipient, date, text, chatId }) {
    this.id = id || uuid();
    this.chatId = chatId || "";
    this.sender = sender;
    this.recipient = recipient;
    this.date = date || new Date().getTime();
    this.text = text || "";
  }
}
