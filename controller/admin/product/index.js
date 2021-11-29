const db = require('mongoose');
const productModel = require('../../../model/product')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/productValidation');
const insertProductValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateProductValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeProduct = require('../../../entity/product')({
  insertProductValidator,
  updateProductValidator
});
const productService = require('../../../services/mongoDbService')({
  model:productModel,
  makeProduct
});
const makeProductController = require('./product');
const productController = makeProductController({
  productService,
  makeProduct
});
module.exports = productController;
