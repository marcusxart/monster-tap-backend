const asyncHandler = require('express-async-handler');
const db = require('../database/models');
const AppError = require('../utils/appError');
const { getIo } = require('../socket');

// exports.incrementCoin = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const io = getIo();
//   const account = await db.accounts.findOne({
//     where: {
//       userId: id,
//     },
//   });

//   if (!account) {
//     throw new AppError('Account not found', 404);
//   }
//   db.sequelize.transaction(async (t) => {
//     await db.accounts.increment('coinCount', {
//       by: 1,
//       where: {
//         id: account.id,
//       },
//       transaction: t,
//     });

//     const updatedAccount = await db.accounts.findOne({
//       where: {
//         id: account.id,
//       },
//       transaction: t,
//     });

//     io.emit('coin-update', updatedAccount.coinCount);

//     if (account.coinCount === 100) {
//       account.bonus = 5;
//       await account.save();
//     }

//     const coinCounts = account.coinCount;
//     const bonus = account.bonus;

//     res.status(200).send({
//       status: 'success',
//       coinCounts,
//       bonus,
//     });
//   });
// });

exports.incrementCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const io = getIo();
  const account = await db.accounts.findOne({
    where: {
      userId: id,
    },
  });

  if (!account) {
    throw new AppError('Account not found', 404);
  }

  await db.sequelize.transaction(async (t) => {
    // Increment coin count by 1
    await db.accounts.increment('coinCount', {
      by: 1,
      where: {
        id: account.id,
      },
      transaction: t,
    });

    // Fetch the updated account with the new coin count
    const updatedAccount = await db.accounts.findOne({
      where: {
        id: account.id,
      },
      transaction: t,
    });

    // Emit the updated coin count
    io.emit('coin-update', updatedAccount.coinCount);

    // Check if the updated coin count has reached 100
    if (updatedAccount.coinCount === 110) {
      updatedAccount.bonus = 5; // Apply bonus
      await updatedAccount.save({ transaction: t });
    }

    res.status(200).send({
      status: 'success',
      coinCounts: updatedAccount.coinCount,
      bonus: updatedAccount.bonus,
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
    throw new AppError('Account not found', 404);
  }
  res.status(200).send({
    status: 'success',
    results: account,
  });
});

exports.assignTask = asyncHandler(async (req, res) => {});
