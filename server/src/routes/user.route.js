const { verify } = require("jsonwebtoken");

const {
  signUp,
  signIn,
  getMe,
  logOut,
  getAllUsers,
  verifyUser,
  getUserProfile,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllRequest,
  countRequset,
  getUserDetails,
  getChatById,
  getMyRequest,
} = require("../controllers/user.controller");
const { authenticateToken } = require("../../middleware/auth");

const router = require("express").Router();

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.get("/get-me", authenticateToken, getMe);
router.get("/get-users", authenticateToken, getAllUsers);
// router.get("/get-new-contact", authenticateToken, newContact);
router.get("/get-my-chat/:chatId", authenticateToken, getChatById);


router.get("/log-out", authenticateToken, logOut);
router.get("/search", authenticateToken, searchUser);

router.put("/send-request", authenticateToken, sendFriendRequest);
router.get("/get-count-request", authenticateToken, countRequset);
router.get("/get-request", authenticateToken, getAllRequest);
router.get("/get-my-request", authenticateToken, getMyRequest);

router.put("/accept-request", authenticateToken, acceptFriendRequest);

module.exports = router;
