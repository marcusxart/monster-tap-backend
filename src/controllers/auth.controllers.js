const asyncHandler = require('express-async-handler');
const generateUniqueId = require('generate-unique-id');
const crypto = require('crypto');
const ejs = require('ejs');
const path = require('path');

const AppError = require('../utils/appError');
const { hashPassword, checkPassword } = require('../utils/hashPassword');
const { USER_COLORS } = require('../configs/constants');
const { generateToken } = require('../utils/tokenGen');
const db = require('../database/models');
const EmailSender = require('../utils/email/email.service');
const { requestOtp, verifyOtp } = require('../utils/otp/otp.service');
const emailSender = new EmailSender();

exports.createUser = asyncHandler(async (req, res) => {
  const data = req.data;
  const { referral_code } = req.query;
  const { email } = data;
  const user = await db.users.findOne({ where: { email } });

  if (user) {
    throw new AppError('User already exists', 409);
  }

  const randomIndex = Math.floor(Math.random() * USER_COLORS.length);
  const color = USER_COLORS[randomIndex];

  data.password = await hashPassword(data.password);
  const referralCode = generateUniqueId({ length: 14 });

  await db.sequelize.transaction(async (t) => {
    const newUser = await db.users.create(
      { ...data, avatarColor: color, referralCode },
      { transaction: t }
    );
    const newAccount = await db.accounts.create(
      {
        coinCount: 0,
        bonus: 0,
        userId: newUser.id,
      },
      { transaction: t }
    );

    if (referral_code) {
      const findReferral = await db.users.findOne({
        where: { referralCode: referral_code },
      });
      if (findReferral) {
        await db.accounts.increment('coinCount', {
          by: 2000,
          where: {
            id: newAccount.id,
          },
          transaction: t,
        });
        await db.accounts.increment('coinCount', {
          by: 2000,
          where: {
            userId: findReferral.id,
          },

          transaction: t,
        });
      }
    }

    const date = new Date();

    // Render the OTP email template with EJS
    const templatePath = path.join(
      __dirname,
      '../utils/email/template/welcome-email.ejs'
    );
    const message = await ejs.renderFile(templatePath, {
      year: date.getFullYear(),
    });

    const emailOptions = {
      email: email,
      subject: 'Welcome ',
      message: message,
    };

    await emailSender.sendEmail(emailOptions);

    res.status(201).send({
      status: 'success',
      message: 'Account created successfully',
    });
  });
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.data;

  const user = await db.users.findOne({
    where: { email },
    include: {
      model: db.accounts,
      as: 'account',
    },
  });

  if (!user) {
    throw new AppError(
      'User not found. Please check your credentials and try again.',
      404
    );
  }

  if (!(await checkPassword(password, user.password))) {
    throw new AppError('Invalid email or password. Please try again.', 401);
  }

  const userInfo = { id: user.id, email: user.email };
  const accessToken = generateToken(userInfo);

  res.status(200).send({
    status: 'success',
    message: 'Login successful',
    access: accessToken,
    user,
  });
});

// exports.handleLogout = asyncHandler(async (req, res) => {
//   const { id } = req.user;

//   const user = await db.users.findOne({ where: { id } });
//   if (!user) {
//     throw new AppError("User not found.", 404);
//   }

//   await db.sequelize.transaction(async (t) => {
//     await db.users.update(
//       { refreshToken: null },
//       { where: { id: user.id }, transaction: t }
//     );
//   });

//   res.status(200).send({
//     status: "success",
//     message: "Logout successful",
//   });
// });

exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await requestOtp(email);

  res.status(200).send({
    status: 'success',
    message: 'OTP has been sent to your email for password reset',
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const user = await db.users.findOne({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 400);
  }

  if (password !== confirmPassword) {
    throw new AppError('password does not match', 403);
  }

  const newPassword = await hashPassword(password);

  // Update user's password
  user.password = newPassword;
  user.otp = null;
  user.otpExpiration = null;
  await user.save();

  return res.status(200).json({ message: 'Password reset successfully' });
});

// exports.forgetPassword = asyncHandler(async (req, res) => {
//   const { email } = req.data;

//   const user = await db.User.findOne({ where: { email } });
//   if (!user) throw new AppError("User with this email does not exist.", 404);

//   await db.sequelize.transaction(async (t) => {
//     // need to send a mail

//     const resetURL = `${req.protocol}://${req.get(
//       "host"
//     )}/resetPassword/${resetToken}`;

//     res.status(200).json({
//       status: "success",
//       message: "",
//       resetURL: process.env.NODE_ENV === "development" ? resetURL : undefined, // Include resetURL only in development
//     });
//   });
// });
