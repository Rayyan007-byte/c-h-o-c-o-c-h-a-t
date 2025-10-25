const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Dtabase connecting error", err);
    });
};

module.exports = connectDB;
