const Joi = require('joi');
const AppError = require('../utils/appError');
const { email, password } = require('../configs/joiConfig');

const joiHandler = (data, req, next) => {
  if (data) {
    const schema = Joi.object(data);
    const { body } = req;
    const { error, value } = schema.validate(body);

    if (error) {
      throw new AppError(error.details[0].message, 403);
    }

    req.data = value;
    next();
  }
};

// Schema for confirming password
const confirmPassword = Joi.any()
  .valid(Joi.ref('password'))
  .required()
  .label('Confirm password')
  .messages({ 'any.only': '{{#label}} does not match' });

module.exports = {
  // Function to validate email and password
  emailPassword: (req, res, next) => {
    joiHandler(
      {
        email,
        password,
      },
      req,
      next
    );
  },

  // Function to validate only email 
  validateEmail: (req, res, next) => {
    joiHandler(
      {
        email,
      },
      req,
      next
    );
  },

  // Function to validate email, password, and confirm password
  validateEmailPasswordConfirm: (req, res, next) => {
    joiHandler(
      {
        email,
        password,
        confirmPassword,
      },
      req,
      next
    );
  },
};
