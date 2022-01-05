const mongoose = require("mongoose");

const PublicProfileSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
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
});

const PublicProfile = mongoose.model("Public_Profile", PublicProfileSchema);

module.exports = PublicProfile;
