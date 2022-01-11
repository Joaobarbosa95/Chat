const Conversations = require("../models/conversations");

async function createNewConversation(userOne, userTwo) {
  const newConversation = new Conversations({
    userOne: userOne,
    userTwo: userTwo,
    conversationId: uuidv4(),
    last_updated: new Date(),
  });

  await newConversation.save();

  return newConversation;
}

async function updateConversationLastUpdated(conversationId) {
  await Conversations.updateOne(
    { conversationId: conversationId },
    { last_updated: new Date() }
  );
}

module.exports = {
  createNewConversation,
  updateConversationLastUpdated,
};
