import ioClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ENDPOINT = "http://localhost:4000";

export function socketInit(username, publicId) {
  const socket = ioClient(ENDPOINT);

  const sessionId = localStorage.getItem("SessionID");

  if (sessionId) {
    socket.auth = { username, publicId, sessionId };
  } else {
    socket.auth = { username, publicId, sessionId: uuidv4() };
  }

  socket.connect();

  socket.onAny((events, ...args) => console.log(events, args));

  socket.on("connect_error", (err) => {
    if (err.message === "Try again later") {
      return null;
    }
  });

  socket.on("session", ({ sessionId }) => {
    socket.sessionId = sessionId;
    localStorage.setItem("SessionID", sessionId);
  });

  return socket;
}
