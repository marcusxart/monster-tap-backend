const { Router } = require("express");
const {
  incrementCoin,
  getAccount,
} = require("../controllers/account.controllers");

const account = Router({ mergeParams: true });

account.post("/", getAccount);
account.post("/incrementCoin", incrementCoin);

module.exports = account;
