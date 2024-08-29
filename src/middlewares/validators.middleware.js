const Joi = require("joi");

const AppError = require("../utils/appError");
const { email, password } = require("../configs/joiConfig");

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

module.exports = {
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
};
