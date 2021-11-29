const db = require('mongoose');
const walletTransactionModel = require('../../../model/walletTransaction')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/walletTransactionValidation');
const insertWalletTransactionValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateWalletTransactionValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeWalletTransaction = require('../../../entity/walletTransaction')({
  insertWalletTransactionValidator,
  updateWalletTransactionValidator
});
const walletTransactionService = require('../../../services/mongoDbService')({
  model:walletTransactionModel,
  makeWalletTransaction
});
const makeWalletTransactionController = require('./walletTransaction');
const walletTransactionController = makeWalletTransactionController({
  walletTransactionService,
  makeWalletTransaction
});
module.exports = walletTransactionController;
