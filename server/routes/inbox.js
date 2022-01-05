const express = require("express");
const auth = require("../middleware/auth");

// collections
const Messages = require("../models/messages");
const PublicProfile = require("../models/publicProfile");

const router = new express.Router();

router.get("/dialogues", auth, async (req, res) => {
  try {
    // Queries 5 unique conversations last messages
    const dialogues = await Messages.find
      .distinct("conversationId")
      .or([{ sender: req.user }, { receiver: req.user }])
      .limit(5);

    res.send(dialogues);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/conversation", auth, async (req, res) => {
  try {
    // User will send a "page number", that will be a query of 10 new messages
    // Ex: req.body.page = 0, query first 10 messages
    //       req.body.page = 1, query the 10 messages after those (skip first 10)
    const startPoint = req.body.page * 10;

    // Query last 10 messages of the conversation
    const messages = await Messages.find({
      conversationId: req.body.conversationId,
    })
      .skip(startPoint)
      .limit(10);
    // See if skip includes the first/end result

    res.send(messages);
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

module.exports = router;
