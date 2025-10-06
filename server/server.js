const { server } = require("./socket/socket");
require("dotenv").config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
