import { v4 as uuid } from "uuid/dist";

export const CONSTANTS = {
  WS: {
    CHAT: "CHAT",
    MESSAGE: "MESSAGE",
    UPDATE: "UPDATE",
  },
  CHAT_TYPES: {
    NEW_CHAT: "NEW_CHAT",
    DELETE_CHAT: "DELETE_CHAT",
  },
  UPDATE_TYPES: {
    USER_STATUS_UPDATE: "USER_STATUS_UPDATE",
    NEW_LIKE: "NEW_LIKE",
    NEW_LOOK: "NEW_LOOK",
    NEW_MATCH: "NEW_MATCH",
    DELETE_MATCH: "DELETE_MATCH",
    DELETE_LIKE: "DELETE_LIKE",
  },
  UPDATE_STATUS: {
    NEW: "UPDATE_STATUS_NEW",
    READ: "UPDATE_STATUS_READ",
  },
  MESSAGE_TYPES: {
    NEW_MESSAGE: "NEW_MESSAGE",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    DELETE_MESSAGE: "DELETE_MESSAGE",
  },
  MESSAGE_STATUS: {
    STATUS_NEW: "STATUS_NEW",
    STATUS_DELIVERED: "STATUS_DELIVERED",
    STATUS_READ: "STATUS_READ",
  },
};

export class WSmessage {
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload || null;
  }
}

export class Chat {
  constructor({ id, userIds, messages }) {
    this.id = id || "";
    this.userIds = userIds;
    this.messages = messages || [];
  }
}

export class Message {
  constructor({ id, sender, recipient, date, text, chatId, status }) {
    this.id = id || uuid();
    this.chatId = chatId || "";
    this.sender = sender;
    this.recipient = recipient;
    this.date = date || new Date().getTime();
    this.text = text || "";
    this.status = status;
  }
}

export class WSNotification {
  constructor({ id, userId, type }) {
    this.id = id || uuid();
    this.date = new Date().getTime();
    this.userId = userId;
    this.type = type;
    this.status = CONSTANTS.UPDATE_STATUS.NEW;
  }

  equals(obj) {
    return (
      this.id === obj.id && this.userId === obj.userId && this.tye === obj.type
    );
  }
}
