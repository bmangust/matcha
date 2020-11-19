import { getCookie } from "../utils";
import { useChat } from "./useChat.hook";

export let socket = null;

export const useWS = () => {
  //   const host = "192.168.43.151";
  const host = "localhost";
  const port = 8080;
  const cookie = getCookie("session_id");
  const { handleChatMessage } = useChat();

  const newConnection = () => {
    return new WebSocket(`ws://${host}:${port}/ws?key=${cookie}`);
  };

  socket = socket ? socket : newConnection();
  console.log(socket);

  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
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
