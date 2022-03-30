const Conversations = require("../models/conversations");
const uuidv4 = require("uuid").v4;

async function getConversationId(userOne, userTwo) {
  console.log("GETCONVERS", userTwo);
  return await Conversations.find({
    $or: [{ userOne: userOne }, { userTwo: userOne }],
  }).and({
    $or: [{ userOne: userTwo }, { userTwo: userTwo }],
  });
}

async function createNewConversation(userOne, userTwo, conversationId) {
  console.log("CREATE NEW", userTwo);
  const newConversation = new Conversations({
    userOne: userOne,
    userTwo: userTwo,
    conversationId: conversationId || uuidv4(),
    last_updated: new Date(),
  });

  console.log("CREATE NEW SAVE");
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
  getConversationId,
};
