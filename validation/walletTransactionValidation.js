const joi = require('joi');

exports.schemaKeys = joi.object({
  walletId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  forOrder: joi.boolean(),
  forWallet: joi.boolean(),
  transactionAmount: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  walletId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  forOrder: joi.boolean(),
  forWallet: joi.boolean(),
  transactionAmount: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
