import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

export function socketInit(username) {
  const socket = ioClient(ENDPOINT);

  socket.emit("user", {
    name: username,
    status: "online",
    image: "",
  });

  return socket;
}
