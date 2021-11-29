const joi = require('joi');

exports.schemaKeys = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  walletAmount: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  walletAmount: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
