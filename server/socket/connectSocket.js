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
    const { username, sessionId, publicId } = socket.handshake.auth;

    // fix the forwarding id.
    // bug: giving the login database id to publicId but using the public profile id when sending

    if (sessionId) {
      const session = users.find(
        (socket) =>
          socket.sessionId === sessionId &&
          socket.publicId === publicId &&
          socket.username === username
      );
      if (session) {
        socket.sessionId = session.sessionId;
        socket.publicId = session.publicId;
        socket.username = session.username;
        return next();
      }
    }

    if (!username) return next("Invalid username");

    socket.sessionId = sessionId;
    socket.publicId = publicId;
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
      publicId: socket.publicId,
    });

    socket.join(socket.publicId);
    console.log(socket.username, socket.publicId);

    socket.on("private message", async (data) => {
      const { message, dialogueId, otherUser, publicId } = data;
      console.log(dialogueId, otherUser, publicId);

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

        socket.to(publicId).to(socket.publicId).emit("new dialogue", {
          activeDialogueId: dialogueId,
          newConversation,
        });

        socket.emit("new dialogue", {
          activeDialogueId: dialogueId,
          newConversation,
        });
        return;
      }

      // Send to the other user and other open tabs
      socket
        .to(publicId)
        .to(socket.publicId)
        .emit("private message", { dialogue });

      // Send main tab
      socket.emit("private message", { dialogue });
    });
  });
}

module.exports = connectSocket;
