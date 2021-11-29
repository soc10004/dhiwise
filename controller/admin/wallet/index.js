const db = require('mongoose');
const walletModel = require('../../../model/wallet')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/walletValidation');
const insertWalletValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateWalletValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeWallet = require('../../../entity/wallet')({
  insertWalletValidator,
  updateWalletValidator
});
const walletService = require('../../../services/mongoDbService')({
  model:walletModel,
  makeWallet
});
const makeWalletController = require('./wallet');
const walletController = makeWalletController({
  walletService,
  makeWallet
});
module.exports = walletController;
