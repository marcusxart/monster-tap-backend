const Joi = require("joi");

module.exports = {
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:<>?\\[\\]|;'\",./`~\\-]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include one uppercase letter, and one special character.",
      "string.empty": "Password is required.",
    }),
  amount: Joi.number().min(10).required().messages({
    "number.min": "Amount must be at least 10.",
    "any.required": "Amount is required.",
  }),
  referralCode: Joi.string().length(6).required().messages({
    "string.base": "Referral code should be a string",
    "string.length": "Referral code must be exactly 6 characters long",
    "any.required": "Referral code is required",
  }),
};
