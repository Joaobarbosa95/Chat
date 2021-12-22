const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  userOne: {
    type: String,
    required: true,
    ref: "User",
  },
  userTwo: {
    type: String,
    required: true,
    ref: "User",
  },
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: Date,
      seen: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;

// Usernames:Reis, Esteves, Isidro, NotYou, YOLO

/*
db.messages.insert([
  {
    userOne: "Reis",
    userTwo: "Esteves",
    messages: [
      {
        sender: "Reis",
        text: "Hi",
        seen: true,
        timestamp: new Date() - 1
      },
      {
        sender: "Esteves",
        text: "Hello",
        seen: true,
        timestamp: new Date() - 1000
      },
      {
        sender: "Esteves",
        text: "How are you doing=",
        seen: false,
        timestamp: new Date() - 10000
      },
    ],
  },
]);
*/
