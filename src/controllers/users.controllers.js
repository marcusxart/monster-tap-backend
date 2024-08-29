const asyncHandler = require("express-async-handler");
const db = require("../database/models");
const AppError = require("../utils/appError");

const attributesOptions = {
  attributes: {
    exclude: ["password", "createdAt", "updatedAt"],
  },
  include: [
    {
      model: db.accounts,
      as: "account",
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt", "id"],
      },
    },
  ],
};

exports.getMe = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await db.users.findOne({
    where: { id },
    ...attributesOptions,
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  res.status(200).send({
    status: "success",
    results: user,
  });
});
