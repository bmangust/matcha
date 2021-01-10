import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../models/ws";
import { useChat } from "./useChat.hook";
import { useOnline } from "./useOnline.hook";
import { useNotifications } from "./useNotifications";

const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const url = `${protocol}://`;
let socket = null;
localStorage.debug = "*";

const newConnection = (id) => {
  return io(url, {
    path: "/api/socket/connect",
    withCredentials: true,
    reconnection: false,
    query: {
      auth: id,
    },
  });
};

export const WSdisconnect = () => {
  socket.disconnect();
};

export const checkStatusAndReconnect = () => {
  if (!socket || socket.readyState !== socket.OPEN) {
    socket = newConnection();
  }
};

export const useWS = () => {
  const id = useSelector((state) => state.general.id);
  const { handleMessage, handleChat } = useChat();
  const { handleNotification } = useNotifications();
  const { updateOnline } = useOnline();

  useEffect(() => {
    socket = newConnection(id);
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
      else handleNotification(json);
    });

    socket.onAny((event, ...args) => {
      console.log(`got ${event}`);
      console.log(args);
    });

    socket.on("disconnect", (reason) => {
      console.log(`[disconnect] ${reason}`);
      if (reason !== "io client disconnect") socket.connect();
    });

    socket.on("close", (reason) => {
      console.log(`[close] ${reason}`);
    });

    socket.on("error", (error) => {
      console.log(error);
      socket.connect();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
};

export const send = (type, payload) => {
  console.log(JSON.stringify(payload));

  socket.emit(type, JSON.stringify(payload));
};
