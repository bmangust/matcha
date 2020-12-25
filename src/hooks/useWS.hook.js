import { useChat } from "./useChat.hook";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../models/ws";
import { useEffect } from "react";
import { useOnline } from "./useOnline.hook";

// const ip = "192.168.43.151";
const ip = "localhost";
const local = true;
const host = local ? ip : "aim-love.ga";
const port = 8080;
const url = local ? `ws://${host}:${port}` : `wss://${host}:3001`;
let socket = null;
localStorage.debug = "*";

const newConnection = (id) => {
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
  const { updateOnline } = useOnline();

  socket = socket ? socket : newConnection(id);

  useEffect(() => {
    socket.on("connect", () => {
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

    socket.on(CONSTANTS.WS.UPDATE, (message) => {
      const json = JSON.parse(message);
      if (json.type === CONSTANTS.UPDATE_TYPES.USER_STATUS_UPDATE)
        updateOnline(json.payload);
    });

    socket.onAny((event, ...args) => {
      console.log(`got ${event}`);
      console.log(args);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
      socket.connect();
    });

    socket.on("close", (reason) => {
      console.log(`[close] ${reason}`);
    });

    socket.onerror = (error) => {
      console.log(error);
      socket.connect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
};

export const send = (type, payload) => {
  console.log(JSON.stringify(payload));

  socket.emit(type, JSON.stringify(payload));
};
