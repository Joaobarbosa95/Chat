const mongoose = require("mongoose");

const PublicProfileSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: "User",
  },
  from: {
    type: String,
    default: "Planet Earth",
  },
  description: {
    type: String,
    default: "No description",
  },
  phone: {
    type: String,
    default: "None",
  },
  email: {
    type: String,
    default: "None",
  },
  other: {
    type: String,
    default: "None",
  },
  more: {
    type: String,
    default: "Nothing shared",
  },

  status: {
    type: Boolean,
    required: true,
  },
});

const PublicProfile = mongoose.model("Public_Profile", PublicProfileSchema);

module.exports = PublicProfile;

// Mock data
/*
db.public_profiles.insert([
  {
    username: "Reis",
    from: "France",
    description: "Blogger",
    phone: "+352 505 000",
    email: "Reis@gmail.com",
    other: "reis1889@linkedin.com",
    more: "On a mission to travel the earth",
    status: true,
  },
  {
    username: "Esteves",
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
*/
