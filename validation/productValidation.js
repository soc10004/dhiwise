const joi = require('joi');

exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  price: joi.number().integer().allow(0),
  sellerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  brand: joi.string().allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  subCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  price: joi.number().integer().allow(0),
  sellerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  brand: joi.string().allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  subCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
