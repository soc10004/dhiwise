const db = require('mongoose');
const shippingModel = require('../../../model/shipping')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/shippingValidation');
const insertShippingValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateShippingValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeShipping = require('../../../entity/shipping')({
  insertShippingValidator,
  updateShippingValidator
});
const shippingService = require('../../../services/mongoDbService')({
  model:shippingModel,
  makeShipping
});
const makeShippingController = require('./shipping');
const shippingController = makeShippingController({
  shippingService,
  makeShipping
});
module.exports = shippingController;
