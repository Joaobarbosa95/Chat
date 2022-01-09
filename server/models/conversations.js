const mongoose = require("mongoose");

const ConversationsSchema = new mongoose.Schema({
  userOne: {
    type: String,
    required: true,
  },
  userTwo: {
    type: String,
    required: true,
  },
  conversationId: {
    type: String,
    required: true,
  },
  last_updated: Date,
});

const Conversations = mongoose.model("conversations", ConversationsSchema);

module.exports = Conversations;
