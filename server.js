require("dotenv").config();
const http = require("http");

const app = require("./src/app");
const db = require("./src/database/models");
const { initSocket } = require("./src/socket");

const PORT = process.env.PORT;
const server = http.createServer(app);

db.sequelize.sync({ alter: true }).then(() => {
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
