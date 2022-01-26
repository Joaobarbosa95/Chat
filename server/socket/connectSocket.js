const globalChat = require("./globalChat");
const privateMessaging = require("./privateMessaging");
const socketAuth = require("../middleware/socketAuth");
const uuidv4 = require("uuid").v4;

function connectSocket(io) {
  let users = [];
  let globalChatUsers = [];
  io.use(async (socket, next) => {
    const { username, sessionId, publicId, token } = socket.handshake.auth;

    if (sessionId) {
      const session = users.find(
        (socket) =>
          socket.sessionId === sessionId &&
          socket.publicId === publicId &&
          socket.username === username &&
          socket.token === token
      );
      if (session) {
        return next();
      }
    }
    const tokenValue = await socketAuth(token);

    socket.sessionId = uuidv4();
    socket.publicId = publicId;
    socket.username = username;
    socket.token = tokenValue;

    next();
  });

  io.on("connection", (socket) => {
    if (socket.token) {
      globalChat(socket, globalChatUsers);
      privateMessaging(io, socket, users);
    } else {
      globalChat(socket, globalChatUsers);
    }
  });
}
module.exports = connectSocket;
