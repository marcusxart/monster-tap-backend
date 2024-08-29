const moment = require("moment");

const constants = require("../config/constants");
const db = require("../database/models");

function generateOTP(x) {
  let otp = "";

  for (let i = 0; i < x; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

async function isUniqueOTP(otp) {
  return !(await db.otp.findOne({ where: { code: otp } }));
}

async function generateUniqueOTP(x) {
  let otp = generateOTP(x);

  while (!(await isUniqueOTP(otp))) {
    otp = generateOTP(x);
  }

  return otp;
}

async function createOTP(userId, type, transaction, limit = 4) {
  const otp = await generateUniqueOTP(limit);
  const futureTime = moment().add(constants.OTP.TIMEOUT, "minutes");
  const expiry = futureTime.format("YYYY-MM-DD HH:mm:ss");
  return await db.otps.create(
    {
      userId: userId,
      code: otp,
      type,
      expiry,
    },
    { transaction }
  );
}

module.exports = { generateUniqueOTP, createOTP };
