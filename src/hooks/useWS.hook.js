import { getCookie } from "../utils";
// import { host, port } from "../setupProxy";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Chat, Message, WSmessage } from "../store/ws";

let socket = null;

export const useWS = () => {
  //   const host = "192.168.43.151";
  const host = "localhost";
  const port = 8080;
  const cookie = getCookie("session_id");
  const myId = useSelector((state) => state.general.id);
  const [chats, setChats] = useState([]);

  const newConnection = () => {
    return new WebSocket(`ws://${host}:${port}/ws?key=${cookie}`);
  };

  socket = socket ? socket : newConnection();
  console.log(socket);

  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
  };

  socket.onmessage = function (event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
    const res = JSON.parse(event.data);
    const chatID = res.payload.id;
    const exists = chats.find((chat) => chatID === chat);
    if (exists) setChats([...chats, chatID]);
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

  const newChat = (id) => {
    console.log("newChat");
    const chat = new Chat({ userIds: [id, myId] });
    const newChat = new WSmessage({ messageType: 100, payload: chat });
    send(newChat);
  };

  const newMessage = (id, text) => {
    console.log("newMessage");
    const ms = new Message({ sender: myId, recepient: id, text });
    const wsMessage = new WSmessage({ messageType: 1, payload: ms });
    send(wsMessage);
  };

  const send = (message) => {
    console.log(JSON.stringify(message));
    socket.send(JSON.stringify(message));
  };

  return { chats, newChat, newMessage };
};
