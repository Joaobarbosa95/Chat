const Conversations = require("../models/conversations");
const uuidv4 = require("uuid").v4;

async function createNewConversation(userOne, userTwo, conversationId) {
  const newConversation = new Conversations({
    userOne: userOne,
    userTwo: userTwo,
    conversationId: conversationId || uuidv4(),
    last_updated: new Date(),
  });

  await newConversation.save();

  return newConversation;
}

async function updateConversationLastUpdated(conversationId) {
  const conversation = await Conversations.findOneAndUpdate(
    { conversationId: conversationId },
    { last_updated: new Date() }
  );

  return conversation;
}

async function removeConversation(conversationId) {
  await Conversations.findOneAndDelete({ conversationId: conversationId });
}

module.exports = {
  createNewConversation,
  updateConversationLastUpdated,
};
