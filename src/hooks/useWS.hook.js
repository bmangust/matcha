import { useChat } from "./useChat.hook";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { stubTrue } from "lodash";
import { CONSTANTS } from "../models/ws";
import { useEffect } from "react";

// const ip = "192.168.43.151";
const ip = "localhost";
const local = stubTrue;
const host = local ? ip : "aim-love.ga";
const port = 8080;
const url = local ? `ws://${host}:${port}` : `wss://${host}:3001`;
let socket = null;
localStorage.debug = "*";

const newConnection = (id) => {
  // const cookie = getCookie("session_id");
  // return io(url);
  return io(url, {
    path: "/api/socket/connect",
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
  const { handleMessage, handleChat } = useChat();

  socket = socket ? socket : newConnection(id);

  useEffect(() => {
    socket.on("connect", (e) => {
      console.log(e);
      console.log(socket.connected);
      console.log("[open] Соединение установлено");

      if (socket.disconnected) {
        console.log("socket disconnected");
      }
    });

    socket.on(CONSTANTS.WS.CHAT, (message) => {
      const json = JSON.parse(message);
      handleChat(json);
    });

    socket.on(CONSTANTS.WS.MESSAGE, (message) => {
      const json = JSON.parse(message);
      handleMessage(json);
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
      //   socket.connect();
      // }
      // else the socket will automatically try to reconnect
    });

    socket.on("close", (reason) => {
      console.log(`[close] ${reason}`);
    });

    socket.onerror = (error) => {
      console.log(error);
      socket.connect();
      // checkStatusAndReconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
};

export const send = (type, payload) => {
  console.log(JSON.stringify(payload));

  socket.emit(type, JSON.stringify(payload));
};
