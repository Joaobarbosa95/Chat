const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

const server = http.createServer(app);

const io = socketIo(server);

let onlineUsers = [];

io.on("connection", (socket) => {
  let socketUser;
  // From which index in messages array the user has message access
  let messages = [];
  let messagesRenderPoint;

  // New client
  socket.on("user", (newUser) => {
    socketUser = newUser;
    onlineUsers.push(newUser);
    // messages.push() - push a user has joined the room message
    // messagesRenderPoint = messages.length - 1;
    socket.broadcast.emit("new-user", { user: socketUser });
  });

  // Get users
  socket.on("get-users", () => {
    socket.emit("online-users", onlineUsers);
  });

  // Get messages
  socket.on("get-messages", () => {
    socket.emit("get-chat", messages.slice(messagesRenderPoint));
  });

  // Another way to update messages
  // socket.on("new-message", () => {
  //   io.sockets.emit("update-chat", messages);
  // });

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

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
