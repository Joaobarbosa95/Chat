import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

export function socketInit() {
  return ioClient(ENDPOINT);
}
