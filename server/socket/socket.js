const http = require("http");

const cors = require("cors");

const app = require("../app");
const { Server } = require("socket.io");

const Message = require("../src/models/messageModel");

const cookieParser = require("cookie-parser");
const { socketAuthenticator } = require("../middleware/auth");

const server = http.createServer(app);
const userSocketIds = new Map();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});
io.on("connection", (socket) => {
  const user = socket.user;
console.log('userrr',user);
 if (!user) {
    console.log("Socket connected without valid user");
    socket.disconnect(true);
    return;
  }

  console.log("user connected", socket.id, user._id);
  socket.on("SEND-MESSAGE", async ({ chatId, InputMessage }) => {
    if (!socket.user) return;
    console.log(chatId, InputMessage);

    const messageForRealTime = {
      chat: chatId,
      sender: {_id: user._id, name: user.name},

      message: InputMessage,
    };

    console.log("messageforreal",messageForRealTime);

    const messageForDB = {
      chat: chatId,
      sender: user._id,
      message: InputMessage,
    };
    const newMessage = new Message(messageForDB);
    await newMessage.save();
    io.emit("RECEIVE-MESSAGE", messageForRealTime);
  });
});

module.exports = { server };
