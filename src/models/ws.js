import { v4 as uuid } from "uuid/dist";

export class WSmessage {
  constructor({ messageType, payload }) {
    this.messageType = messageType;
    this.payload = payload || null;
  }
}

export const CONSTANTS = {
  WS: {
    NEW_CHAT: 100,
    NEW_MESSAGE: 1,
    EDIT_MESSAGE: 2,
    DELETE_MESSAGE: 3,
  },
  MESSAGE: {
    SENT_MESSAGE: 1,
    DELIVERED_MESSAGE: 2,
    READ_MESSAGE: 3,
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
  constructor({ id, sender, recipient, date, state, text, chatId }) {
    this.id = id || uuid();
    this.chatId = chatId || "";
    this.sender = sender;
    this.recipient = recipient;
    this.date = date || new Date().getTime();
    this.state = state || CONSTANTS.MESSAGE.SENT_MESSAGE;
    this.text = text || "no text";
  }
}
