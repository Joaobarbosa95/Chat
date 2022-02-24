const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  conversationId: {
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
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
