const Messages = require("../models/messages");

function connectSocket(io) {
  // let onlineUsers = [];
  // io.on("connection", (socket) => {
  //   let socketUser;
  //   let messages = [];
  //   // New client
  //   socket.on("user", (newUser) => {
  //     socketUser = newUser;
  //     onlineUsers.push(newUser);
  //     socket.broadcast.emit("new-user", { user: socketUser });
  //   });
  //   // Get users
  //   socket.on("get-users", () => {
  //     socket.emit("online-users", onlineUsers);
  //   });
  //   // Update messages
  //   socket.on("new-message", (message) => {
  //     messages.push(message);
  //     socket.broadcast.emit("update-messages", message);
  //   });
  //   // Inform other users this client connected
  //   socket.on("disconnect", () => {
  //     onlineUsers = onlineUsers.filter((user) => user.name !== socketUser.name);
  //     io.sockets.emit("user-disconnect", { user: socketUser });
  //   });
  // });
  const users = [];

  io.use((socket, next) => {
    const { username, sessionId, userId } = socket.handshake.auth;

    if (sessionId) {
      const session = users.find(
        (socket) =>
          socket.sessionId === sessionId &&
          socket.userId === userId &&
          socket.username === username
      );
      if (session) {
        socket.sessionId = session.sessionId;
        socket.userId = session.userId;
        socket.username = session.username;
        return next();
      }
    }

    if (!username) return next("Invalid username");

    socket.sessionId = sessionId;
    socket.userId = userId;
    socket.username = username;
    users.push(socket);
    next();
  });

  io.on("connection", (socket) => {
    socket.on("connect", (socket) => {
      users.push(socket);
    });

    // socket.emit("users", users);

    socket.emit("session", {
      sessionId: socket.sessionId,
      userId: socket.userId,
    });

    socket.join(socket.userId);

    socket.on("private message", async (data) => {
      const { message, dialogueId, activeDialogue, otherUser } = data;

      const dialogue = await Messages.findByIdAndUpdate(
        dialogueId,
        {
          $push: { messages: message },
        },
        { new: true }
      );

      if (!dialogue) {
        const newDialogue = new Messages({
          userOne: socket.username,
          userTwo: otherUser,
          messages: [message],
        });

        const newConversation = await newDialogue.save();

        console.log(activeDialogue._id);
        console.log(newConversation);

        socket.to(activeDialogue).to(socket.userId).emit("new dialogue", {
          activeDialogueId: activeDialogue._id,
          newConversation,
        });

        socket.emit("new dialogue", {
          activeDialogueId: activeDialogue._id,
          newConversation,
        });
        return;
      }

      // Send to the other user and other open tabs
      socket
        .to(activeDialogue)
        .to(socket.userId)
        .emit("private message", { dialogue });

      // Send main tab
      socket.emit("private message", { dialogue });
    });
  });
}

module.exports = connectSocket;
