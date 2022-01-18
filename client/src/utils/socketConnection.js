import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

export function socketInit(username, publicId) {
  const socket = ioClient(ENDPOINT);

  const sessionId = localStorage.getItem("SessionID");

  socket.auth = { username, publicId, sessionId };

  socket.connect();

  socket.onAny((events, ...args) => console.log(events, args));

  socket.on("connect_error", (err) => {
    if (err.message === "Try again later") {
      return null;
    }
  });
  if (!publicId) return socket;

  socket.on("session", ({ sessionId }) => {
    socket.sessionId = sessionId;
    localStorage.setItem("SessionID", sessionId);
  });

  return socket;
}
