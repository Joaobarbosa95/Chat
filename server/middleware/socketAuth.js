const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const socketAuth = async (token) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return null;
    }

    return token;
  } catch (e) {
    return null;
  }
};

module.exports = socketAuth;
