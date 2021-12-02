// Environment variables
require("dotenv").config();

const express = require("express");
const { createServer } = require("http");

// Socket
const socketIo = require("socket.io");
const connectSocket = require("./socket/connectSocket");

// Routes
const mountUserRouter = require("./routes/user");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// Routes
mountUserRouter(app);

// Server
const server = createServer(app);

// Socket io
const io = socketIo(server);

connectSocket(io);

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
