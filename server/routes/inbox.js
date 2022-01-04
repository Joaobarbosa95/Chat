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
