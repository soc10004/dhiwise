const db = require('mongoose');
const cartModel = require('../../../model/cart')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/cartValidation');
const insertCartValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateCartValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeCart = require('../../../entity/cart')({
  insertCartValidator,
  updateCartValidator
});
const cartService = require('../../../services/mongoDbService')({
  model:cartModel,
  makeCart
});
const makeCartController = require('./cart');
const cartController = makeCartController({
  cartService,
  makeCart
});
module.exports = cartController;
