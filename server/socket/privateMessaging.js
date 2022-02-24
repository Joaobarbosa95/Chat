const PublicProfile = require("../models/publicProfile");

const { saveNewMessage } = require("../utils/messagesCollectionFunctions");
const {
  createNewConversation,
  updateConversationLastUpdated,
} = require("../utils/conversationCollectionFunctions");

const removeOfflineUser = require("../utils/removeOfflineUser");

const uuidv4 = require("uuid").v4;

module.exports = (io, socket, users) => {
  socket.on("connection", () => {
    users.push({
      username: socket.username,
      sessionId: socket.sessionId,
      publicId: socket.publicId,
      token: socket.token,
    });
  });
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
    // Clear session
    removeOfflineUser(socket.username, users);

    // Set status in the publicProfile
    await PublicProfile.findByIdAndUpdate(
      { _id: socket.publicId },
      { status: false }
    );

    // Broadcast the disconnect event
    io.emit("user disconnected", { username: socket.username });
  });
};
