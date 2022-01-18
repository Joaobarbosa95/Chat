const PublicProfile = require("../models/publicProfile");

const { saveNewMessage } = require("../utils/messagesCollectionFunctions");
const {
  createNewConversation,
  updateConversationLastUpdated,
} = require("../utils/conversationCollectionFunctions");

const uuidv4 = require("uuid").v4;

function connectSocket(io) {
  let users = [];
  let globalChatUsers = [];

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

    if (!publicId) next();

    users.push({
      username: socket.username,
      sessionId: socket.sessionId,
      publicId: socket.publicId,
    });
    next();
  });

  io.on("connection", (socket) => {
    /**
     * GLOBAL CHAT
     */
    let messages = [];

    socket.on("user joined chat", () => {
      socket.join("global chat");
      socket.to("global chat").emit("user joined chat", {
        username: socket.username,
      });
      socket.emit("user joined chat", { username: socket.username });
      globalChatUsers.push({ username: socket.username });
    });

    // Get users
    socket.on("get users", () => {
      socket.to("global chat").emit("online users", globalChatUsers);
    });
    // Update messages
    socket.on("new message", (message) => {
      messages.push(message);
      socket.to("global chat").emit("new message", message);
      socket.emit("new message", message);
    });
    // Inform other users this client connected
    socket.on("user left chat", () => {
      socket.leave("global chat");
      globalChatUsers = globalChatUsers.filter(
        (user) => user.username !== socket.username
      );
      socket
        .to("global chat")
        .emit("user disconnect", { username: socket.username });
    });

    /**
     * PRIVATE MESSAGING
     */
    socket.emit("session", {
      sessionId: socket.sessionId,
      publicId: socket.publicId,
    });

    socket.join(socket.publicId);

    socket.broadcast.emit("user connected", { username: socket.username });

    socket.on("users", () => {
      socket.emit("users", { users: users });
    });

    socket.on("private message", async (data) => {
      const { username, publicId, message, activeDialogue: dialogueId } = data;

      const conversation = await updateConversationLastUpdated(dialogueId);

      if (!conversation) {
        await createNewConversation(socket.username, username, dialogueId);
      }

      const newMessage = await saveNewMessage(
        socket.username,
        username,
        dialogueId,
        message
      );
      // Send to the other user and other open tabs
      socket
        .to(publicId)
        .to(socket.publicId)
        .emit("private message", { newMessage });

      socket
        .to(publicId)
        .to(socket.publicId)
        .emit("private message 2", { newMessage });

      // Send main tab
      socket.emit("private message", { newMessage });
      socket.emit("private message 2", { newMessage });
    });

    socket.on("new dialogue", async ({ username }) => {
      const id = uuidv4();
      socket.emit("new dialogue", {
        userOne: socket.username,
        userTwo: username,
        id: id,
      });
    });
    socket.on("disconnect", async () => {
      if (!socket.publicId) return;

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
