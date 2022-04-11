const removeOfflineUser = require("../utils/removeOfflineUser");

module.exports = (socket, globalChatUsers) => {
  socket.on("user joined chat", () => {
    // Reconnect
    globalChatUsers.find((user) => user.username === socket.username);

    // First time joining
    console.log(socket.username + " joined chat");
    socket.join("global chat");
    socket.to("global chat").emit("user joined chat", {
      username: socket.username,
    });
    socket.emit("user joined chat", { username: socket.username });
    globalChatUsers.push({ username: socket.username });
    socket.emit("online users", globalChatUsers);
  });

  // Update messages
  socket.on("new message", (message) => {
    socket.to("global chat").emit("new message", message);
    socket.emit("new message", message);
  });

  // Inform other users this client connected
  socket.on("user left chat", () => {
    console.log(socket.username + " left chat");
    removeOfflineUser(socket.username, globalChatUsers);
    socket
      .to("global chat")
      .emit("user left chat", { username: socket.username });
    socket.leave("global chat");
  });
};
