require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const AppError = require("../utils/appError");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    throw new AppError("Token is missing. Please provide a valid token.", 400);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      throw new AppError("Invalid or expired token. Please log in again.", 403);

    req.user = user;
  });
  next();
});

module.exports = verifyJWT;
