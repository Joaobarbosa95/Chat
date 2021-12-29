// Models
const User = require("../models/user");
const Messages = require("../models/messages");
const PublicProfile = require("../models/publicProfile");
const auth = require("../middleware/auth");

const mongoose = require("mongoose");

const multer = require("multer");
const sharp = require("sharp");

const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/user/login", async (req, res) => {
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

router.post("/user/createAccount", async (req, res) => {
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
      status: true,
    });
    const public = await newPublicProfile.save();

    res.status(201).send({ user, token, public });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.delete("/users/me", auth, async (req, res) => {
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
  "/users/me/avatar",
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

// introduce mock data
async function mock() {
  await Messages.create([
    {
      userOne: "reis",
      userTwo: "esteves",
      messages: [
        {
          sender: "reis",
          text: "Hi",
          seen: true,
          timestamp: new Date().getTime(),
        },
        {
          sender: "esteves",
          text: "Hello",
          seen: true,
          timestamp: new Date().getTime(),
        },
        {
          sender: "esteves",
          text: "How are you doing=",
          seen: false,
          timestamp: new Date().getTime(),
        },
      ],
    },
  ]);

  await Messages.create([
    {
      userOne: "paulo",
      userTwo: "esteves",
      messages: [
        {
          sender: "paulo",
          text: "Hi",
          seen: true,
          timestamp: new Date(22222222).getTime(),
        },
        {
          sender: "esteves",
          text: "Hello",
          seen: true,
          timestamp: new Date(500000).getTime(),
        },
        {
          sender: "esteves",
          text: "How are you doing=",
          seen: false,
          timestamp: new Date(1000000).getTime(),
        },
      ],
    },
  ]);

  await User.create({
    username: "mirtilo",
    password: "$2b$08$1aNBvtDY.8YPBDOvWRq0D.i1YZ4u4l0Ex2L1ljQWwPjHP1aw0uvSm",
  });

  await User.create({
    username: "reis",
    password: "123456789",
  });

  await PublicProfile.insertMany([
    {
      username: "reis",
      from: "France",
      description: "Blogger",
      phone: "+352 505 000",
      email: "Reis@gmail.com",
      other: "reis1889@linkedin.com",
      more: "On a mission to travel the earth",
      status: true,
    },
    {
      username: "esteves",
      from: "Belgica",
      description: "Padre",
      phone: "+666 666 666",
      email: "priest@gmail.com",
      status: false,
    },
    {
      username: "NotYou",
      from: "RU",
      status: true,
    },
    {
      username: "Isidro",
      from: "Tuga",
      more: "A podar videiras",
      status: false,
    },
    {
      username: "YOLO",
      description: "You only live once",
      other: "4chan.org",
      more: "A unique style of trolling",
      status: true,
    },
  ]);
}

mock();
