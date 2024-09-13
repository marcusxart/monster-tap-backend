const ejs = require('ejs');
const asyncHandler = require('express-async-handler');
const path = require('path');
const db = require('../../database/models');
const { hashPassword, checkPassword } = require('../../utils/hashPassword');
const EmailSender = require('../../utils/email/email.service');
const emailSender = new EmailSender();
const AppError = require('../../utils/appError');

exports.generateOtp = asyncHandler(async (req, res) => {
  const otp = Math.floor(Math.random() * 9000) + 1000;
  const otpString = otp.toString();
  return otpString;
});

exports.requestOtpWhenExpires = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const otp = await this.generateOtp();
  const date = new Date();
  const hashedOtp = await hashPassword(otp);
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = hashedOtp;
  user.otpExpiration = otpExpiration;
  await user.save();

  // Render the OTP email template with EJS
  const templatePath = path.join(
    __dirname,
    '../email/template/otpEmailTemplate.ejs'
  );
  const message = await ejs.renderFile(templatePath, {
    otp,
    year: date.getFullYear(),
  });

  const emailOptions = {
    email: email,
    subject: 'Reset Password OTP',
    message: message,
  };

  await emailSender.sendEmail(emailOptions);

  res.status(200).send({
    status: 'success',
    message: 'OTP sent to your email',
  });
});

exports.requestOtp = async (email) => {
  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const otp = await this.generateOtp();
  const date = new Date();
  const hashedOtp = await hashPassword(otp);
  const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

  // Update user with OTP and expiration
  user.otp = hashedOtp;
  user.otpExpiration = otpExpiration;
  await user.save();

  // Render the OTP email template with EJS
  const templatePath = path.join(
    __dirname,
    '../email/template/otpEmailTemplate.ejs'
  );
  const message = await ejs.renderFile(templatePath, {
    otp,
    year: date.getFullYear(),
  });

  const emailOptions = {
    email: email,
    subject: 'Reset Password OTP',
    message: message,
  };

  // Send the email
  await emailSender.sendEmail(emailOptions);

  return {
    status: 'success',
    message: 'OTP sent to your email',
  };
};

exports.verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.data;
  const user = await db.users.findOne({ where: { email } });
  console.log(user.otp);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.otpExpiration && user.otpExpiration < new Date()) {
    // OTP has expired, clear it and throw an error
    user.otp = null;
    user.otpExpiration = null;
    await user.save(); // Save the cleared OTP values to the database

    throw new AppError('OTP has expired', 400);
  }

  if (!(await checkPassword(otp, user.otp))) {
    throw new AppError(
      'The OTP you entered is incorrect. Please try again.',
      401
    );
  }

  user.otp = null;
  user.otpExpiration = null;
  await user.save();

  res.status(200).json({
    message: 'OTP verified successfully',
  });
});
