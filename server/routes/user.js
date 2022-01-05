// Models
const User = require("../models/user");
const PublicProfile = require("../models/publicProfile");
const auth = require("../middleware/auth");

const multer = require("multer");
const sharp = require("sharp");

const express = require("express");

const router = new express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();

    const public = await PublicProfile.findOne({ username: req.body.username });

    res.status(200).send({ user, token, public });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/createAccount", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userMatch = await User.find({ username: username });
    if (userMatch.length !== 0)
      return res.status(400).send({ error: "Username already in use" });

    const user = new User({ username: username, password: password });
    const token = await user.generateAuthToken();

    // New public profile entry
    const newPublicProfile = new PublicProfile({
      username: username,
    });
    const public = await newPublicProfile.save();

    res.status(201).send({ user, token, public });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

router.post("/validate", auth, async (req, res) => {
  try {
    const publicProfile = await PublicProfile.findOne({
      username: req.user,
    });
    res.send({ username: req.user, publicProfile });
  } catch (e) {
    res.send({ error: "Invalid Token" });
  }
});

router.get("/profile", auth, async (req, res) => {
  res.send(req.user);
});

router.delete("/profile", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
