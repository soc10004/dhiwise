const db = require('mongoose');
const countryModel = require('../../../model/country')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/countryValidation');
const insertCountryValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateCountryValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeCountry = require('../../../entity/country')({
  insertCountryValidator,
  updateCountryValidator
});
const countryService = require('../../../services/mongoDbService')({
  model:countryModel,
  makeCountry
});
const makeCountryController = require('./country');
const countryController = makeCountryController({
  countryService,
  makeCountry
});
module.exports = countryController;
