const joi = require('joi');

exports.schemaKeys = joi.object({
  customerId: joi.string().allow(null).allow(''),
  isVisible: joi.string().allow(null).allow(''),
  cartItems: joi.array().items(joi.object()),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  customerId: joi.string().allow(null).allow(''),
  isVisible: joi.string().allow(null).allow(''),
  cartItems: joi.array().items(joi.object()),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
