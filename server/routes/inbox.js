const express = require("express");
const auth = require("../middleware/auth");

// collections
const Messages = require("../models/messages");
const PublicProfile = require("../models/publicProfile");
const Conversations = require("../models/conversations");

const { getConversationId } = require("../utils/conversationCollectionFunctions");

const router = new express.Router();

router.post("/dialogues", auth, async (req, res) => {
  // Each page is equivalent to 5 conversations/dialogues
  const conversationsLoaded = req.body.conversationsLoaded;
  try {
    const dialogues = await Conversations.find({
      $or: [{ userOne: req.user }, { userTwo: req.user }],
    })
      .sort("-last_updated")
      .skip(conversationsLoaded)
      .limit(5);

    res.send(dialogues);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/messages", auth, async (req, res) => {
  const conversationId = req.body.conversationId;
  const messagesLoaded = req.body.messagesLoaded;
  try {
    const messages = await Messages.find({ conversationId: conversationId })
      .sort("-timestamp")
      .skip(messagesLoaded)
      .limit(20);

    res.send(messages);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/last-message", auth, async (req, res) => {
  const conversationId = req.body.conversationId;
  try {
    let lastMessage = await Messages.find({
      conversationId: conversationId,
      seen: false,
    }).sort("-timestamp");

    let unSeenMessages = lastMessage.filter(
      (message) => message.sender !== req.user
    );

    if (lastMessage.length === 0) {
      lastMessage = await Messages.find({
        conversationId: conversationId,
      })
        .sort("-timestamp")
        .limit(1);

      unSeenMessages = 0;
    }

    res.send({
      lastMessage: lastMessage[0],
      unseenCount: unSeenMessages.length,
    });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/public-profile", auth, async (req, res) => {
  try {
    const publicProfile = await PublicProfile.find({
      username: req.body.username,
    });

    res.send(publicProfile);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/dialogue-search", auth, async (req, res) => {
  try {
    if (req.body.username.length === 0) return res.send([]);

    const publicProfile = await PublicProfile.find({
      username: { $regex: "^" + req.body.username },
    }).limit(5);

    res.send(publicProfile);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/conversationid", auth, async (req, res) => {
  //
  const conversationId = await getConversationId(req.user, req.body.username);

  res.send(conversationId);
});

router.post("/update-messages-status", auth, async (req, res) => {
  const { conversationId } = req.body;

  const lastMessage = await Messages.updateMany(
    {
      conversationId: conversationId,
      seen: false,
      sender: { $ne: req.user },
    },
    { seen: true }
  );

  res.send(lastMessage);
});
module.exports = router;
