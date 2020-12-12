const queryString = require("query-string");
import express = require("express");
const app = express();
import { Request, Response } from "express";
import { Socket } from "socket.io";
const http = require("http").createServer(app);
const readline = require("readline");
const uuid = require("uuid").v4;
// const jsonParser = require("socket.io-json-parser");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  path: "/ws",
  // parser: jsonParser,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CONSTANTS = {
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

class User {
  id: string;
  name: string;
  chats: string[];
  socket: Socket;
  constructor({
    id,
    name,
    chats,
    socket,
  }: {
    id: string;
    name: string;
    socket: Socket;
    chats?: string[];
  }) {
    this.id = id;
    this.name = name;
    this.socket = socket;
    this.chats = chats || [];
  }
  toString() {
    return JSON.stringify(this);
  }
}

class WSmessage {
  type: string;
  payload: User | Message | null;
  constructor({ type, payload }: { type: string; payload?: User | Message }) {
    this.type = type;
    this.payload = payload || null;
  }
  toString() {
    return JSON.stringify(this);
  }
}

class Chat {
  id: string;
  userIds: string[];
  messages: WSmessage[];
  constructor({
    id,
    userIds,
    messages,
  }: {
    id: string;
    userIds: string[];
    messages: WSmessage[];
  }) {
    this.id = id || uuid();
    this.userIds = userIds;
    this.messages = messages || [];
  }
}

class Message {
  id: string;
  sender: string;
  recipient: string;
  date: number;
  text: string;
  chatId: string;
  constructor({
    id,
    sender,
    recipient,
    date,
    text,
    chatId,
  }: {
    id: string;
    sender: string;
    recipient: string;
    date: number;
    text: string;
    chatId: string;
  }) {
    this.id = id || uuid();
    this.chatId = chatId || "";
    this.sender = sender;
    this.recipient = recipient;
    this.date = date || new Date().getTime();
    this.text = text || "";
  }
  toString() {
    return JSON.stringify(this);
  }
}

// console.log(io);

// ===========================
// ======== STATIC ===========
// ===========================

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("run react app");
});
app.get("/api/main/account", (req, res) => {
  res.send(
    JSON.stringify({
      status: true,
      data: {
        id: uuid(),
        name: "Max",
        users: mapUsersToIds(),
      },
    })
  );
});
app.get("/api/main/chat", (req: Request, res: Response) => {
  // console.log("GET chat");
  // console.log(req);

  const id = req.query && req.query.id && (req.query as any).id;
  console.log(id);
  res.send(
    JSON.stringify({
      status: true,
      data: {
        chats: [...chats.values()],
      },
    })
  );
});

// ===========================
// ======== SOCKET ===========
// ===========================

const chats = new Map<string, Chat>();
const users = new Map<string, User>();

io.on("connection", (socket: Socket) => {
  // console.log(socket);

  const parsed = queryString.parse(socket.handshake.url.split("?")[1]);
  console.log(parsed);
  const userId = parsed.auth;
  const user = new User({
    id: userId,
    name: userId,
    socket: socket,
  });
  users.set(socket.id, user);

  socket.onAny((event, ...args) => console.log(event, ...args));

  socket.on(CONSTANTS.WS.MESSAGE, (message) => {
    const json = JSON.parse(message);
    console.log(json);
    const payload = json.payload;
    switch (json.type) {
      case CONSTANTS.MESSAGE.NEW_MESSAGE:
        // if first message in chat - send NEW_CHAT message first
        // save chat in db
        // add message to db
        // send to other NEW_MESSAGE
        // ---- or maybe just send DELIVERED_MESSAGE

        console.log("[NEW MESSAGE]");
        const chatId = payload.chatId;
        console.log(chatId);
        addMessageToChat(chatId, json);
        sendToUser(
          CONSTANTS.WS.MESSAGE,
          CONSTANTS.MESSAGE.NEW_MESSAGE,
          payload
        );

        return;
      case CONSTANTS.MESSAGE.DELIVERED_MESSAGE:
        // update status of message in db
        // send to both DELIVERED_MESSAGE
        return;
      case CONSTANTS.MESSAGE.READ_MESSAGE:
        // update status in db
        // send to other READ_MESSAGE
        return;
      case CONSTANTS.MESSAGE.EDIT_MESSAGE:
        // update message in db
        // send to other EDIT_MESSAGE
        return;
      case CONSTANTS.MESSAGE.DELETE_MESSAGE:
        // delete message in db
        // send to other DELETE_MESSAGE
        return;
      default:
        return;
    }
  });

  socket.on(CONSTANTS.WS.CHAT, (message) => {
    const json = JSON.parse(message);
    const payload = json.payload;
    const newChat = new Chat({ ...payload });
    console.log(json);
    switch (json.type) {
      case CONSTANTS.CHAT.NEW_CHAT:
        // save chat in memory, wait for the first message
        console.log("[NEW_CHAT]");
        const chatExists = [...chats.values()].find(
          (chat) =>
            chat.userIds.includes(newChat.userIds[0]) &&
            chat.userIds.includes(newChat.userIds[1])
        );

        console.log(chatExists);
        !chatExists && chats.set(newChat.id, newChat);
        return;
      case CONSTANTS.CHAT.DELETE_CHAT:
        // send to both DELETE_CHAT message
        // delete chat from db
        return;
      default:
        return;
    }
  });

  socket.on("error", (e) => {
    console.log(e);
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnect: " + reason);
    try {
      deleteUserFromChat(socket.id);
      console.log("user disconnected: " + getUserId(socket));
    } catch (e) {
      console.log(e);
    }
  });
});

http.listen(8080, () => {
  console.log("listening on *:8080");
});

// ===========================
// ========= UTILS ===========
// ===========================

rl.on("line", (input: string) => {
  if (input.startsWith("users")) {
    console.log(users);
  } else if (input.startsWith("user ids")) {
    console.log(mapUsersToIds());
  } else if (input.startsWith("chats")) {
    console.log(chats);
  } else if (input.startsWith("chat ids")) {
    console.log(mapChatsToIds());
  }
});

const getUserId = (socket: Socket): string => {
  const user = users.get(socket.id);
  const id = user && user.id;
  if (id) return id;
  else throw new Error("User not found by socket id");
};

const deleteUserFromChat = (userId: string) => {
  users.delete(userId);
};

const addMessageToChat = (chatId: string, message: WSmessage) => {
  // it would be better to use something like immer
  // to prevent unexpected store changes
  const chat = chats.get(chatId);
  chat && chat.messages.push(message) && chats.set(chatId, chat);
};

const getChatLength = (chatId: string): number => {
  const chat = chats.get(chatId);
  return chat ? chat.messages.length : 0;
};

const sendToUser = (WStype: string, type: string, message: Message) => {
  const userId = message.recipient;
  const user = [...users.values()].find((user) => user.id === userId);
  const wsMessage = new WSmessage({ type, payload: message });
  console.log("[sendToUser]", { userId, type, wsMessage });
  user && user.socket.emit(WStype, wsMessage.toString());
};

const mapChatsToIds = () => {
  return chats && chats.size ? Array.from(chats.keys()) : [];
};

const mapUsersToIds = () => {
  return users && users.size ? Array.from(users.keys()) : [];
};

const getAllUserChats = (userId: string | undefined): string[] => {
  console.log([...chats.values()]);
  [...chats.values()].forEach((el) => console.log(el));
  return userId && chats && chats.size
    ? // if userId is in chat => return chat id
      [...chats.values()]
        .filter((chat) => !!chat.userIds.find((id) => id === userId))
        .map((chat) => chat.id)
    : [];
};
