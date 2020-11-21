import { getCookie } from "../utils";
import { useChat } from "./useChat.hook";

// const status = {
//   CONNECTING: "CONNECTING",
//   READY: "READY",
//   CLOSED: "CLOSED",
// };
//   const host = "192.168.43.151";
const host = "localhost";
const port = 8080;
const cookie = getCookie("session_id");
let socket = null;
const queue = [];

const newConnection = () => {
  return new WebSocket(`ws://${host}:${port}/ws?key=${cookie}`);
};

export const useWS = () => {
  const { handleChatMessage } = useChat();

  socket = socket ? socket : newConnection();
  // console.log(socket);

  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
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
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log("[close] Соединение прервано");
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };

  return socket;
};

export const send = (message) => {
  console.log(JSON.stringify(message));
  if (!socket) socket = newConnection();
  console.log(socket);

  if (socket.readyState !== socket.OPEN) {
    // queue all messages
    queue.push(message);
    return;
  }
  socket.send(JSON.stringify(message));
};
