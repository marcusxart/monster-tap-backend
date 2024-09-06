const { Router } = require('express');
const {
  createUser,
  handleLogin,
  forgetPassword,
} = require('../controllers/auth.controllers');
const validators = require('../middlewares/validators.middleware');

const auth = Router();

auth.post('/sign-up', validators.validateEmailPasswordConfirm, createUser);
auth.post('/sign-in', validators.emailPassword, handleLogin);
auth.post('/forget-password', validators.validateEmail, forgetPassword);

module.exports = auth;
