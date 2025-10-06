const jwt = require("jsonwebtoken");
const User = require("../src/models/userModel");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Invalid Token, please signin again" });

      req.user = decodedData.id;
      console.log("decodedData", decodedData);

      next();
    });
  } catch (error) {
    console.log(error);
  }
};

// omidleware for socket
const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const authToken = socket.request.cookies.token;

    if (!authToken) {
      return next(new Error("Invalid Login to access this route"));
    }

    jwt.verify(authToken, process.env.JWT_SECRET, async (err, decoded) => {
      const user = await User.findById(decoded.id);
      console.log("user", user);
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authenticateToken, socketAuthenticator };
