const joi = require('joi');

exports.schemaKeys = joi.object({
  orderId: joi.string().allow(null).allow(''),
  courierCompany: joi.string().allow(null).allow(''),
  deliveryStartDate: joi.date().allow(null).allow(''),
  EstimatedDeliveryDate: joi.date().allow(null).allow(''),
  ActualDeliveryDate: joi.date().allow(null).allow(''),
  isPrepaid: joi.boolean(),
  isReturned: joi.boolean(),
  returningReason: joi.string().allow(null).allow(''),
  returnPickupDate: joi.date().allow(null).allow(''),
  isReturnDamaged: joi.boolean(),
  returnRecievedDate: joi.date().allow(null).allow(''),
  shippingStatus: joi.number().integer().default(1).allow(0),
  isActive: joi.boolean(),
  deliveryAddress: joi.object({
    pincode:joi.string(),
    address1:joi.string(),
    address2:joi.string(),
    landmark:joi.string(),
    city:joi.string(),
    isDefault:joi.boolean(),
    state:joi.string(),
    addressType:joi.string(),
    fullName:joi.string(),
    mobileNo:joi.number().integer(),
    addressNo:joi.number().integer()
  }).allow(0),
  isDeleted: joi.boolean()
}).unknown(true);
exports.updateSchemaKeys = joi.object({
  orderId: joi.string().allow(null).allow(''),
  courierCompany: joi.string().allow(null).allow(''),
  deliveryStartDate: joi.date().allow(null).allow(''),
  EstimatedDeliveryDate: joi.date().allow(null).allow(''),
  ActualDeliveryDate: joi.date().allow(null).allow(''),
  isPrepaid: joi.boolean(),
  isReturned: joi.boolean(),
  returningReason: joi.string().allow(null).allow(''),
  returnPickupDate: joi.date().allow(null).allow(''),
  isReturnDamaged: joi.boolean(),
  returnRecievedDate: joi.date().allow(null).allow(''),
  shippingStatus: joi.number().integer().default(1).allow(0),
  isActive: joi.boolean(),
  deliveryAddress: joi.object({
    pincode:joi.string(),
    address1:joi.string(),
    address2:joi.string(),
    landmark:joi.string(),
    city:joi.string(),
    isDefault:joi.boolean(),
    state:joi.string(),
    addressType:joi.string(),
    fullName:joi.string(),
    mobileNo:joi.number().integer(),
    addressNo:joi.number().integer()
  }).allow(0),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);
