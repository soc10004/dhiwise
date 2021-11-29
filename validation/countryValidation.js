const joi = require('joi');

exports.schemaKeys = joi.object({
  countryName: joi.string().allow(null).allow(''),
  phoneCode: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  countryName: joi.string().allow(null).allow(''),
  phoneCode: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
