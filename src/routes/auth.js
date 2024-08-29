const { Router } = require("express");
const { createUser, handleLogin } = require("../controllers/auth.controllers");
const validators = require("../middlewares/validators.middleware");

const auth = Router();

auth.post("/sign-up", validators.emailPassword, createUser);
auth.post("/sign-in", validators.emailPassword, handleLogin);

module.exports = auth;
