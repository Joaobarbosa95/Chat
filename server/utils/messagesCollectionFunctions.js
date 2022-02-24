const Messages = require("../models/messages");

async function saveNewMessage(sender, receiver, conversationId, message) {
  const newMessage = new Messages({
    sender: sender,
    receiver: receiver,
    conversationId: conversationId,
    text: message.text,
    timestamp: message.timestamp,
    seen: false,
  });

  await newMessage.save();

  return newMessage;
}

module.exports = {
  saveNewMessage,
};
