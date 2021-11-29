const joi = require('joi');

exports.schemaKeys = joi.object({
  bannerTitle: joi.string().allow(null).allow(''),
  alternateTitle: joi.string().allow(null).allow(''),
  startDate: joi.date().allow(null).allow(''),
  endDate: joi.date().allow(null).allow(''),
  images: joi.array().items(),
  redirectLink: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  sellerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  bannerTitle: joi.string().allow(null).allow(''),
  alternateTitle: joi.string().allow(null).allow(''),
  startDate: joi.date().allow(null).allow(''),
  endDate: joi.date().allow(null).allow(''),
  images: joi.array().items(),
  redirectLink: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  sellerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
