import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  path: "/ws/chat/",
  transports: ["websocket"],
});