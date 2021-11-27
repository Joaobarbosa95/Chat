let messages = []
let onlineUsers = []

class Connection {
  constructor(io, socket) {
    this.io = io;
    this.socket
  }
}


function chat(io) {
    io.on("connection", (socket) => {
        new Connection(io, socket)
    })
}

export chat