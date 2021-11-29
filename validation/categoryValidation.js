const joi = require('joi');

exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  parentCategoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  parentCategoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
