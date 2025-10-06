const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
