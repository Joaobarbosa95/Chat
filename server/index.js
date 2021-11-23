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
  let messages = [];

  // New client
  socket.on("user", (newUser) => {
    console.log(newUser);
    socketUser = newUser;
    onlineUsers.push(newUser);
    socket.broadcast.emit("new-user", { onlineUsers, user: socketUser });
  });

  // Get users
  socket.on("get-users", () => {
    socket.emit("online-users", onlineUsers);
  });

  // Update messages
  socket.on("new-message", (message) => {
    socket.broadcast.emit("update-messages", message);
  });

  // Inform other users this client connected
  socket.on("disconnect", () => {
    console.log("User disconnect", socketUser);
    console.log(onlineUsers);
    // filter is the easy fix, not the best
    onlineUsers = onlineUsers.filter((user) => user.name !== socketUser.name);
    io.emit("user-disconnect", onlineUsers);
  });
});

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
