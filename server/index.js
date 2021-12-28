// Environment variables
require("dotenv").config();

// Database
require("./db/mongoose");

const express = require("express");
const { createServer } = require("http");

// Socket
const socketIo = require("socket.io");
const connectSocket = require("./socket/connectSocket");

// Routes
const mountRoutes = require("./routes");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// Routes
mountRoutes(app);

// Server
const server = createServer(app);

// Socket io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

connectSocket(io);

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
