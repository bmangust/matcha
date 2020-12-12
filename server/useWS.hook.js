import { getCookie } from "../utils";
import { useChat } from "./useChat.hook";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { stubTrue } from "lodash";

// const host = "192.168.43.151";
const local = stubTrue;
const host = local ? "localhost" : "aim-love.ga";
const port = 8080;
const url = local ? `ws://${host}:${port}` : `wss://${host}:3001`;
let socket = null;
const queue = [];
localStorage.debug = "*";

const newConnection = (id) => {
  // const cookie = getCookie("session_id");
  // return io(url);
  return io(url, {
    path: "/ws",
    reconnectionDelayMax: 10000,
    withCredentials: true,
    reconnection: false,
    query: {
      auth: id,
    },
  });
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
  const id = useSelector((state) => state.general.id);
  const { handleChatMessage, getChatsInfo } = useChat();

  socket = socket ? socket : newConnection(id);

  socket.on("connect", (e) => {
    console.log(e);
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

  socket.on("hello", (message) => {
    console.log(message);
  });

  socket.onerror = function (error) {
    console.log(error);
    // checkStatusAndReconnect();
  };

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
