import { getCookie } from "../utils";
import { useChat } from "./useChat.hook";
import { io } from "socket.io-client";

// const host = "192.168.43.151";
// const host = "aim-love.ga";
const host = "localhost";
const port = 8080;
let socket = null;
const queue = [];

const newConnection = () => {
  const cookie = getCookie("session_id");
  return io(`ws://${host}:${port}`, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
    path: "/ws",
    reconnection: false,
    query: {
      k: cookie,
    },
  });
  // return new WebSocket(`ws://${host}:${port}/ws?key=${cookie}`);
  // return new WebSocket(`wss://${host}/ws?key=${cookie}`);
};

export const WSdisconnect = () => {
  socket = null;
};

export const checkStatusAndReconnect = () => {
  if (!socket || socket.readyState !== socket.OPEN) {
    socket = newConnection();
  }
};

export const useWS = () => {
  const { handleChatMessage, getChatsInfo } = useChat();

  socket = socket ? socket : newConnection();

  socket.on("connect", () => {
    console.log(socket.connected);
    console.log("[open] Соединение установлено");
    getChatsInfo();

    if (socket.disconnected) {
      console.log("socket disconnected");
    }
  });

  socket.onAny((event, ...args) => {
    console.log(`got ${event}`);
    console.log(args);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    socket.connect();
    // if (reason === "io server disconnect") {
    //   // the disconnection was initiated by the server, you need to reconnect manually
    //    socket.connect();
    // }
    // else the socket will automatically try to reconnect
  });

  // socket.onopen = function (e) {
  //   console.log("[open] Соединение установлено");
  //   getChatsInfo();
  //   while (queue.length > 0) {
  //     const message = queue.shift();
  //     send(message);
  //   }
  // };

  // socket.onmessage = function (event) {
  //   const res = JSON.parse(event.data);
  //   console.log(`[message] Данные получены с сервера:`, res);
  //   if (res.messageType < 200) handleChatMessage(res);
  // };

  // socket.onclose = function (event) {
  //   if (event.wasClean) {
  //     console.log(
  //       `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
  //     );
  //     socket = null;
  //   } else {
  //     // server killed the connection or user is offline (event.code 1006)
  //     console.log("[close] Соединение прервано");
  //     console.log(event);
  //     checkStatusAndReconnect();
  //   }
  // };

  // socket.onerror = function (error) {
  //   console.log(`[error] ${error.message}`);
  //   checkStatusAndReconnect();
  // };

  return socket;
};

export const send = (message) => {
  console.log(JSON.stringify(message));
  // if (!socket) socket = newConnection();
  console.log(socket);

  // if (socket.readyState !== socket.OPEN) {
  //   checkStatusAndReconnect();
  //   // queue all messages
  //   queue.push(message);
  //   return;
  // }

  socket.emit("message", JSON.stringify(message), (data) => {
    console.log(data); // data will be 'woot'
  });
  // socket.send(JSON.stringify(message));
};
