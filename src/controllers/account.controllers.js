const asyncHandler = require("express-async-handler");
const db = require("../database/models");
const AppError = require("../utils/appError");
const { getIo } = require("../socket");

exports.incrementCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const io = getIo();
  const account = await db.accounts.findOne({
    where: {
      userId: id,
    },
  });

  if (!account) {
    throw new AppError("Account not found", 404);
  }
  db.sequelize.transaction(async (t) => {
    await db.accounts.increment("coinCount", {
      by: 1,
      where: {
        id: account.id,
      },
      transaction: t,
    });

    const updatedAccount = await db.accounts.findOne({
      where: {
        id: account.id,
      },
      transaction: t,
    });

    io.emit("coin-update", updatedAccount.coinCount);

    res.status(200).send({
      status: "success",
    });
  });
});

exports.getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await db.accounts.findOne({
    where: {
      userId: id,
    },
  });

  if (!account) {
    throw new AppError("Account not found", 404);
  }
  res.status(200).send({
    status: "success",
    results: account,
  });
});
