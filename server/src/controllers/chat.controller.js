const { ALERT, REFETCH_CHATS } = require("../constants/events");
const { getOtherMembers } = require("../lib/helper");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const { emitEvent } = require("../utils/features");

const newGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    if (members.length < 2)
      return res
        .status(400)
        .json({ message: "Group chat must have at least 2 members" });

    const allMembers = [...members, req.user];
    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcomet to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);
    return res.status(200).json({ success: true, message: "Group Created" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// get chat
const getMyChat = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMembers = getOtherMembers(members, req.user);
      console.log("otherMembers", otherMembers);

      return {
        _id,
        groupChat,
        name: groupChat ? name : otherMembers.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });
    return res.status(200).json({
      message: "Chats fetched",
      chats,
      transformedChats,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// get my group
const getMyGroup = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar),
    }));

    res.status(200).json({ success: true, chats, groups });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// add members

const addMembers = async (req, res) => {
  try {
    const { chatId, members } = req.body;
    if (!members || members.length < 1)
      return res.status(400).json({ message: "Please Provide members" });
    const chat = await Chat.findById(chatId);
    if (!chat) res.status(404).json({ message: "Chat not found" });

    if (!chat.groupChat)
      return res.status(404).json({ message: "Groupchat not found" });

    if (chat.creator.toString() !== req.user.toString())
      res.status(403).json({ message: "You are not allowed to add members" });

    const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers.filter(
      (i) => !chat.members.includes(i._id.toString()).map((i) => i._id)
    );

    chat.members.push(...uniqueMembers);

    if (chat.members.length > 20)
      res.status(400).json({ message: "Group member limit reached" });
    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUsersName} has been add ed in the group`
    );

    res
      .status(200)
      .json({ success: true, message: "Members added successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// remov members
const removeMembers = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
      Chat.findById(chatId),
      User.findById(userId, "name"),
    ]);

    if (!chat) return res.status(404).json({ message: "Chat not found" });
    if (!chat.groupChat)
      return res.status(404).json({ message: "This is not a groupchat" });
    if (!chat.creator)
      return res
        .status(400)
        .json({ message: "You are not allowed to remove member" });

    if (chat.members.length <= 3)
      return res
        .status(400)
        .json({ message: "Group must have at least 3 members" });

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );
    chat.save();
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userThatWillBeRemoved.name} has been removed from group`
    );

    res
      .status(200)
      .json({ success: true, message: "Members removed successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// get chat details
const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();
      if (!chat) return res.status(404).json({ message: "Chat not found" });

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar,
      }));
      return res.status(200).json({ success: true, chat });
    } else {
      const chat = await Chat.findById(req.params.id);
      return res.status(200).json({ success: true, chat });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// rename group
const renameGroup = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (!chat.groupChat)
      return res.status(400).json({ message: "This is not groupchat" });

    if (chat.creator.toString() !== req.user.toString())
      return res
        .status(400)
        .json({ message: "You are not allowed to rename group" });
    chat.name = name;
    await chat.save();
    emitEvent(req, REFETCH_CHATS, chat.members);
    return res
      .status(200)
      .json({ success: true, message: "Group rename successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete chat
const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    await chat.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Chat has been deleted" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

// sendmessagess
// const sendMessage = async (req, res) => {
//   try {
//     const { chatId } = req.body;
//     const [chat, me] = await Promise.all([
//       Chat.findById(chatId),
//       User.findById(req.user),
//     ]);
//     if (!chat)
//       return res
//         .status(400)
//         .json({ success: false, message: "Chat not found" });

//     // messageFor db
//     const messageForDB = {
//       message: "fii",
//       chat: chatId,
//       sender: me._id,
//     };

//     const message = await Message.create(messageForDB);

//     // message for realtime
//     const messageForRealtime = {};

//     return res.status(200).json({ success: true, chat, me, message });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// get message
const getMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    const message = await Message.find({ chat: chatId }).populate(
      "sender",
      "name"
    ).populate("chat");
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  newGroupChat,
  getMyChat,
  getMyGroup,
  addMembers,
  removeMembers,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessage,
  // sendMessage,
};
