const User = require("../models/userModel");
const Request = require("../models/requestModel");
const jwt = require("jsonwebtoken");
const { cookiesOption, emitEvent } = require("../utils/features");
const { NEW_REQUSET, REFETCH_CHATS } = require("../constants/events");
const Chat = require("../models/chatModel");
require("dotenv").config();

// user Sign-up
const signUp = async (req, res) => {
  const { name, username, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });
    const newUser = new User({ name, username, password, avatar });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User reistered successfully", newUser });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// signin
const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(400).json({ message: "Invalid Username" });

    const isMatch = password === existingUser.password;
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: existingUser._id, name: existingUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Signin successfully", existingUser, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// myProfile
const getMe = async (req, res) => {
  const userId = req.user;

  try {
    const profile = await User.findById(userId);
    res
      .status(200)
      .json({ success: true, message: "Fetched profile", profile });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// logout api
const logOut = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    res
      .status(200)
      .cookie("token", "", { ...cookiesOption, maxAge: 0 })
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error", user });
  }
};

// get all users except me
const getAllUsers = async (req, res) => {
  const userId = req.user;

  try {
    const allUsers = await User.find({ _id: { $ne: userId } });
    res
      .status(200)
      .json({ success: true, message: "Fetched userss", allUsers });
  } catch (error) {
    console.log(error);
    e;

    return res.status(500).json({ message: "Internal server error" });
  }
};

// serch-user
const searchUser = async (req, res) => {
  console.log("requser", req.user);

  try {
    console.log("serching");
    const { name } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user });

    // all users from my chats
    const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

    // all user exceptin me and friends
    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    // modifying the response
    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar,
    }));

    return res.status(200).json({
      success: true,
      message: name,
      myChats,
      allUsersFromMyChats,
      allUsersExceptMeAndFriends,
      users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// send request
const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });
    if (request)
      return res.status(400).json({ message: "Request already sent" });

    const newRequest = new Request({ sender: userId, receiver: req.user });
    await newRequest.save();
    emitEvent(req, NEW_REQUSET, [userId]);
    return res.status(200).json({ message: "Friend Request Sent" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// accept friend requset
const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");
    if (!request) return res.status(400).json({ message: "Request Not Found" });
    if (request.sender._id.toString() !== req.user.toString())
      return res
        .status(400)
        .json({ message: "You are not authorized to accept this requset" });

    if (!accept) {
      await request.deleteOne();
      return res
        .status(200)
        .json({ success: true, message: "Friend requset rejected" });
    }

    const members = [request.sender._id, request.receiver._id];
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
      emitEvent(req, REFETCH_CHATS, members),
    ]);

    return res
      .status(200)
      .json({ success: true, message: "Friend Requset Accepted" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// get all requset
const getAllRequest = async (req, res) => {
  try {
    const request = await Request.find({ sender: req.user }).populate(
      "receiver",
      "name"
    );

    if (!request) {
      return res
        .status(400)
        .json({ success: false, message: "Requset Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Friend request ", request });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// count requset

const countRequset = async (req, res) => {
  console.log("requser", req.user);

  try {
    const pendingRequset = await Request.countDocuments({
      sender: req.user,
    });

    return res
      .status(200)
      .json({ success: true, message: "Requset found", pendingRequset });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  getMe,
  logOut,
  getAllUsers,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllRequest,
  countRequset,
};
