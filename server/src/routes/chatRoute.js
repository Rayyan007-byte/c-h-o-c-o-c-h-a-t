const { authenticateToken } = require("../../middleware/auth");
const {
  newGroupChat,
  getMyChat,
  getMyGroup,
  addMembers,
  removeMembers,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessage,
  sendMessage,
} = require("../controllers/chat.controller");

const router = require("express").Router();

router.post("/new-group-chat", authenticateToken, newGroupChat);

router.get("/get-my-chat", authenticateToken, getMyChat);

router.get("/get-my-group", authenticateToken, getMyGroup);

router.put("/add-members", authenticateToken, addMembers);

router.put("/remove-members", authenticateToken, removeMembers);

router.post("/message", authenticateToken, sendMessage);
router.get("/get-message/:id", authenticateToken, getMessage);

router
  .route("/:id")
  .get(authenticateToken, getChatDetails)
  .put(authenticateToken, renameGroup)
  .delete(authenticateToken, deleteChat);

module.exports = router;
