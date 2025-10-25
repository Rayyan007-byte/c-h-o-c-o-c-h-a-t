const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/connectDB");
const userRoute = require("./src/routes/user.route");

const chatRoute = require("./src/routes/chatRoute");
const { createUser } = require("./src/seeders/user");

connectDB();
// createUser(10);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

module.exports = app;
