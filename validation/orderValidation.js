const joi = require('joi');

exports.schemaKeys = joi.object({
  customerId: joi.string().allow(null).allow(''),
  sellerId: joi.string().allow(null).allow(''),
  orderItems: joi.array().items(),
  totalAmount: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  customerId: joi.string().allow(null).allow(''),
  sellerId: joi.string().allow(null).allow(''),
  orderItems: joi.array().items(),
  totalAmount: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
