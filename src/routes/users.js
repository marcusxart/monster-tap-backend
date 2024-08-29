const { Router } = require("express");
const { getMe } = require("../controllers/users.controllers");
const account = require("./account");

const users = Router();

users.get("/me", getMe);
users.use("/:id/account", account);

module.exports = users;
