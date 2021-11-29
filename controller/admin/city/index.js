const db = require('mongoose');
const cityModel = require('../../../model/city')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/cityValidation');
const insertCityValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateCityValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeCity = require('../../../entity/city')({
  insertCityValidator,
  updateCityValidator
});
const cityService = require('../../../services/mongoDbService')({
  model:cityModel,
  makeCity
});
const makeCityController = require('./city');
const cityController = makeCityController({
  cityService,
  makeCity
});
module.exports = cityController;
