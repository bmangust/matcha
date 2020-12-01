import { getCookie } from "../utils";
import { useChat } from "./useChat.hook";

// const host = "192.168.43.151";
const host = "localhost";
const port = 8080;
const cookie = getCookie("session_id");
let socket = null;
const queue = [];

const newConnection = () => {
  return new WebSocket(`ws://${host}:${port}/ws?key=${cookie}`);
};

export const checkStatusAndReconnect = () => {
  if (!socket || socket.readyState !== socket.OPEN) {
    socket = newConnection();
  }
};

export const useWS = () => {
  const { handleChatMessage, getChatsInfo } = useChat();

  socket = socket ? socket : newConnection();

  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
    getChatsInfo();
    while (queue.length > 0) {
      const message = queue.shift();
      send(message);
    }
  };

  socket.onmessage = function (event) {
    const res = JSON.parse(event.data);
    console.log(`[message] Данные получены с сервера:`, res);
    if (res.messageType < 200) handleChatMessage(res);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      );
      socket = null;
    } else {
      // server killed the connection or user is offline (event.code 1006)
      console.log("[close] Соединение прервано");
      console.log(event);
      checkStatusAndReconnect();
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
    checkStatusAndReconnect();
  };

  return socket;
};

export const send = (message) => {
  console.log(JSON.stringify(message));
  if (!socket) socket = newConnection();
  console.log(socket);

  if (socket.readyState !== socket.OPEN) {
    checkStatusAndReconnect();
    // queue all messages
    queue.push(message);
    return;
  }
  socket.send(JSON.stringify(message));
};
