const db = require('mongoose');
const categoryModel = require('../../../model/category')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/categoryValidation');
const insertCategoryValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateCategoryValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeCategory = require('../../../entity/category')({
  insertCategoryValidator,
  updateCategoryValidator
});
const categoryService = require('../../../services/mongoDbService')({
  model:categoryModel,
  makeCategory
});
const makeCategoryController = require('./category');
const categoryController = makeCategoryController({
  categoryService,
  makeCategory
});
module.exports = categoryController;
