const mongoose = require("mongoose");

const privateMessagesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  privateMessages: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      messages: [{ timestamp: Number, text: String }],
    },
  ],
});

privateMessagesSchema.virtual("userId", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});

const privateMessages = mongoose.model(
  "Private_Messages",
  privateMessagesSchema
);

module.exports = privateMessages;
