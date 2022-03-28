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

async function fetchMessages(conversationId, messagesLoaded) {
  return await Messages.find({ conversationId: conversationId })
    .sort("-timestamp")
    .skip(messagesLoaded)
    .limit(20);
}

module.exports = {
  saveNewMessage,
  fetchMessages,
};
