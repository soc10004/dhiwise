const joi = require('joi');

exports.schemaKeys = joi.object({
  pincode: joi.string().allow(null).allow(''),
  cityId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  stateId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  countryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  pincode: joi.string().allow(null).allow(''),
  cityId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  stateId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  countryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
