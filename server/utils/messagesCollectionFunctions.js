const Messages = require("../models/messages");

async function saveNewMessage(
  sender,
  receiver,
  conversationId,
  { text, timestamp }
) {
  const newMessage = await Messages.insertOne({
    sender: sender,
    receiver: receiver,
    conversationId: conversationId,
    message: {
      text: text,
      timestamp: timestamp,
      seen: false,
    },
  });

  await newMessage.save();

  return newMessage;
}

module.exports = {
  saveNewMessage,
};
