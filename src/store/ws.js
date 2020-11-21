export class WSmessage {
  constructor({ messageType, toChat, payload }) {
    this.messageType = messageType;
    this.toChat = toChat || "";
    this.payload = payload || null;
  }
}

export const CONSTANTS = {
  NEW_CHAT: 100,
  NEW_MESSAGE: 1,
  EDIT_MESSAGE: 2,
  DELETE_MESSAGE: 3,
  SENT_MESSAGE: 1,
  DELIVERED_MESSAGE: 2,
  READ_MESSAGE: 3,
};

export class Chat {
  constructor({ id, userIds, messages }) {
    this.id = id || "";
    this.userIds = userIds;
    this.messages = messages || null;
  }
}

export class Message {
  constructor({ id, sender, recepient, date, state, text }) {
    this.id = id || "";
    this.sender = sender;
    this.recepient = recepient;
    this.date = date || new Date().getTime();
    this.state = state || 1;
    this.text = text || "no text";
  }
}
