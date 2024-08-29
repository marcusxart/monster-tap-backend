require("dotenv").config();

const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.log("error", err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
}

module.exports = errorHandler;
