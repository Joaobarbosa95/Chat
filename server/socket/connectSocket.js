function connectSocket(io) {
  let onlineUsers = [];

  io.on("connection", (socket) => {
    let socketUser;
    let messages = [];

    // New client
    socket.on("user", (newUser) => {
      socketUser = newUser;
      onlineUsers.push(newUser);
      socket.broadcast.emit("new-user", { user: socketUser });
    });

    // Get users
    socket.on("get-users", () => {
      socket.emit("online-users", onlineUsers);
    });

    // Update messages
    socket.on("new-message", (message) => {
      messages.push(message);
      socket.broadcast.emit("update-messages", message);
    });

    // Inform other users this client connected
    socket.on("disconnect", () => {
      console.log("User disconnect", socketUser);
      onlineUsers = onlineUsers.filter((user) => user.name !== socketUser.name);
      io.sockets.emit("user-disconnect", { user: socketUser });
    });
  });
}

module.exports = connectSocket;
