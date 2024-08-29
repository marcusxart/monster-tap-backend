const { createLogger, transports, format } = require("winston");
const moment = require("moment");

const Logger = createLogger({
  transports: [
    new transports.File({
      filename: `./logs/${moment().format("DD-MM-YYYY")}-error.log`,
      level: "error",
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json()
      ),
    }),
  ],
});

module.exports = Logger;
