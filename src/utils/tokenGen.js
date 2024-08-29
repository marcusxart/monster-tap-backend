const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_EXPIRES_IN } = require("../configs/constants");

exports.generateToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};
// exports.generateRefreshToken = function (user) {
//   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "1d",
//   });
// };
