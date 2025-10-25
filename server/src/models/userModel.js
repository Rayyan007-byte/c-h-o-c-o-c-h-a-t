const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String, default: "Avatar" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
