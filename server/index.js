import express, { json } from "express";
import { createServer } from "http";

// Socket
import socketIo from "socket.io";
import connectSocket from "./socket/connectSocket";

// Routes
import { mountUserRouter } from "./routes/user";

const PORT = process.env.PORT;
const app = express();

app.use(json());

// Routes
mountUserRouter(app);

// Server
const server = createServer(app);

// Socket io
const io = socketIo(server);

connectSocket(io);

server.listen(PORT, () => console.log("Server listing on port %i", PORT));
