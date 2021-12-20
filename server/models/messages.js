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
      timestamps: {
        createdAt: "created_at",
      },
      seen: {
        type: boolean,
        default: false,
      },
    },
  ],
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
