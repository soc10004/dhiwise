const db = require('mongoose');
const pincodeModel = require('../../../model/pincode')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/pincodeValidation');
const insertPincodeValidator = require('../../../validation/genericValidator')(schemaKeys);
const updatePincodeValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makePincode = require('../../../entity/pincode')({
  insertPincodeValidator,
  updatePincodeValidator
});
const pincodeService = require('../../../services/mongoDbService')({
  model:pincodeModel,
  makePincode
});
const makePincodeController = require('./pincode');
const pincodeController = makePincodeController({
  pincodeService,
  makePincode
});
module.exports = pincodeController;
