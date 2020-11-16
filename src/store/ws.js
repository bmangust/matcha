export class WSmessage {
  constructor({ messageType, toChat, payload }) {
    this.messageType = messageType;
    this.toChat = toChat || "";
    this.payload = payload || null;
  }
}

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
