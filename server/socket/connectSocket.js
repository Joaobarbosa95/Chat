const Messages = require("../models/messages");
const PublicProfile = require("../models/publicProfile");

const uuidv4 = require("uuid").v4;

function connectSocket(io) {
  // let onlineUsers = [];
  // io.on("connection", (socket) => {
  //   let socketUser;
  //   let messages = [];
  //   // New client
  //   socket.on("user", (newUser) => {
  //     socketUser = newUser;
  //     onlineUsers.push(newUser);
  //     socket.broadcast.emit("new-user", { user: socketUser });
  //   });
  //   // Get users
  //   socket.on("get-users", () => {
  //     socket.emit("online-users", onlineUsers);
  //   });
  //   // Update messages
  //   socket.on("new-message", (message) => {
  //     messages.push(message);
  //     socket.broadcast.emit("update-messages", message);
  //   });
  //   // Inform other users this client connected
  //   socket.on("disconnect", () => {
  //     onlineUsers = onlineUsers.filter((user) => user.name !== socketUser.name);
  //     io.sockets.emit("user-disconnect", { user: socketUser });
  //   });
  // });
  let users = [];

  io.use((socket, next) => {
    const { username, sessionId, publicId } = socket.handshake.auth;

    if (sessionId) {
      const session = users.find(
        (socket) =>
          socket.sessionId === sessionId &&
          socket.publicId === publicId &&
          socket.username === username
      );
      if (session) {
        return next();
      }
    }

    if (!username) return next("Invalid username");

    socket.sessionId = uuidv4();
    socket.publicId = publicId;
    socket.username = username;
    users.push({
      username: socket.username,
      sessionId: socket.sessionId,
      publicId: socket.publicId,
    });
    next();
  });

  io.on("connection", (socket) => {
    socket.emit("session", {
      sessionId: socket.sessionId,
      publicId: socket.publicId,
    });

    socket.join(socket.publicId);

    socket.broadcast.emit("user connected", { username: socket.username });

    socket.on("users", () => {
      socket.emit("users", users);
    });

    socket.on("private message", async (data) => {
      const { text, sender, receiver, publicId } = data;
      let { conversationId } = data;

      if (!conversationId) {
        conversationId = uuidv4();
      }

      const message = await Messages.InsertOne({
        sender: sender,
        receiver: receiver,
        conversationId: conversationId,
        message: text,
        timestamp: new Date(),
        seen: false,
      });

      // send message to both sockets
      socket.to(publicId).to(socket.publicId).emit("private message", {
        message,
      });

      // Send message to main tab
      socket.emit("private message", { message });
    });

    socket.on("disconnect", async () => {
      // Clear session
      users = users.filter(
        (usersSocket) => usersSocket.sessionId !== socket.sessionId
      );

      // Set status in the publicProfile
      await PublicProfile.findByIdAndUpdate(
        { _id: socket.publicId },
        { status: false }
      );

      // Broadcast the disconnect event
      io.emit("user disconnected", { username: socket.username });
    });
  });
}

module.exports = connectSocket;
