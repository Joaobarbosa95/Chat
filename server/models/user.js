const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new Error("Username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Wrong password");
    }

    return user;
  } catch (e) {
    throw new Error("Service unavailable");
  }
};

// Hash the plain text password before saving
userSchema.pre("save", async function (req, res, next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
