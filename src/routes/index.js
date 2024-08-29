const { Router } = require("express");
const verifyJWT = require("../middlewares/verifyJWT.middleware");

const api = Router();

api.get("/", (req, res) => {
  res.send("Server running");
});

api.use("/auth", require("./auth"));

// api.use(verifyJWT);
api.use("/users", require("./users"));
module.exports = api;

// cb69e685-3266-48e3-813a-b1380cc17420
