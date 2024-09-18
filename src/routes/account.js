const { Router } = require('express');
const {
  incrementCoin,
  getAccount,
  getUserBonus
} = require('../controllers/account.controllers');
const verifyJWT = require('../middlewares/verifyJWT.middleware');

const account = Router({ mergeParams: true });

account.post('/', getAccount);
account.post('/incrementCoin/:id', verifyJWT, incrementCoin);
account.get('/getUserBonus/:id', getUserBonus);

module.exports = account;
