import mongoose from "mongoose";

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

privateMessagesSchema.virtual("user", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
});

const privateMessages = mongoose.model(
  "Private_Messages",
  privateMessagesSchema
);

export default privateMessages;
