const emitEvent = (req, event, users, data) => {
  console.log("Emiting Event", event);
};

const cookiesOption = {
  maxAge: 1000 * 60 * 60 * 24 * 15,
  httpOnly: true,
  secure: true,
};

module.exports = { emitEvent, cookiesOption };
