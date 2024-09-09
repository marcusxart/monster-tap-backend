const { Router } = require('express');
const {
  createUser,
  handleLogin,
  forgetPassword,
  resetPassword,
} = require('../controllers/auth.controllers');
const validators = require('../middlewares/validators.middleware');
const OtpService = require('../utils/otp/otp.service');
const otpService = new OtpService();

const auth = Router();

auth.post('/sign-up', validators.validateEmailPasswordConfirm, createUser);
auth.post('/sign-in', validators.emailPassword, handleLogin);
auth.post('/forget-password', validators.validateEmail, forgetPassword);
auth.post(
  '/reset-password',
  validators.validateEmailPasswordConfirm,
  resetPassword
);
auth.post('/request-otp', validators.validateEmail, otpService.requestOtp);
auth.post('/verify-otp', validators.validateEmailAndOtp, otpService.verifyOtp);

module.exports = auth;
