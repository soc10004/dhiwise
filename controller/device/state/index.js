const db = require('mongoose');
const stateModel = require('../../../model/state')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/stateValidation');
const insertStateValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateStateValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeState = require('../../../entity/state')({
  insertStateValidator,
  updateStateValidator
});
const stateService = require('../../../services/mongoDbService')({
  model:stateModel,
  makeState
});
const makeStateController = require('./state');
const stateController = makeStateController({
  stateService,
  makeState
});
module.exports = stateController;
