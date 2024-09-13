const { Router } = require('express');
const {
  createUser,
  handleLogin,
  forgetPassword,
  resetPassword,
} = require('../controllers/auth.controllers');
const validators = require('../middlewares/validators.middleware');
const {
  requestOtpWhenExpires,
  verifyOtp,
} = require('../utils/otp/otp.service');

const auth = Router();

auth.post('/sign-up', validators.validateEmailPasswordConfirm, createUser);
auth.post('/sign-in', validators.emailPassword, handleLogin);
auth.post('/forget-password', validators.validateEmail, forgetPassword);
auth.post(
  '/reset-password',
  validators.validateEmailPasswordConfirm,
  resetPassword
);
auth.post('/request-otp', validators.validateEmail, requestOtpWhenExpires);
auth.post('/verify-otp', validators.validateEmailAndOtp, verifyOtp);

module.exports = auth;
