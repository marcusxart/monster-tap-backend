const { Router } = require('express');
const {
  incrementCoin,
  getAccount,
  getUserBonus,
  getUserCoinCounts
} = require('../controllers/account.controllers');
const verifyJWT = require('../middlewares/verifyJWT.middleware');

const account = Router({ mergeParams: true });

account.post('/', getAccount);
account.post('/incrementCoin/:id', verifyJWT, incrementCoin);
account.get('/getUserBonus/:id', getUserBonus);
account.get('/getUserCoinCount/:id', getUserCoinCounts);

module.exports = account;
