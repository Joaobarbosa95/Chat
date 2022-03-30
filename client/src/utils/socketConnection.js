import ioClient from "socket.io-client";

// const ENDPOINT = "https://chateia-me-server.herokuapp.com/";
const ENDPOINT = "http://localhost:4000";

export function socketInit(username, publicId, token) {
  const socket = ioClient(ENDPOINT, {
    upgrade: false,
    transports: ["websocket"],
    reconnection: true,
    forceNew: true,
  });

  const sessionId = localStorage.getItem("SessionID");

  socket.auth = { username, publicId, sessionId, token };

  socket.connect();

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
