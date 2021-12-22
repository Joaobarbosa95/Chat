const express = require("express");
const auth = require("../middleware/auth");

// collections
const Messages = require("../models/messages");
const PublicProfile = require("../models/publicProfile");

const router = new express.Router();

router.get("/dialogues", auth, async (req, res) => {
  try {
    const dialogues = await Messages.find({
      $or: [{ userOne: req.user }, { userTwo: req.user }],
    });

    res.send(dialogues);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/public-profile", auth, async (req, res) => {
  try {
    const publicProfile = await PublicProfile.find({ username: req.user });

    res.send(publicProfile);
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router