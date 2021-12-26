const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  userOne: {
    type: String,
    required: true,
  },
  userTwo: {
    type: String,
    required: true,
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
