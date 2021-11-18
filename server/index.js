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

let messages = [];
let onlineUsers = [{ name: "eu" }];

io.on("connection", (socket) => {
  // New client
  socket.on("user", (newUser) => {
    onlineUsers.push(newUser);
    // Inform this user which client are connected
    socket.emit("online-users", onlineUsers);
  });

  // // Inform other users this client connected
  // socket.broadcast.emit("new-user", { onlineUsers, newUser });

  // socket.once("disconnect", () => {
  //   console.log("User disconnect", newUser);
  //   // filter is the easy fix, not the best
  //   onlineUsers = onlineUsers.filter((user) => user.name !== newUser.name);
  //   io.emit("user-disconnect", { onlineUsers, newUser });
  // });
});

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
