const db = require('mongoose');
const bannerModel = require('../../../model/banner')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/bannerValidation');
const insertBannerValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateBannerValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeBanner = require('../../../entity/banner')({
  insertBannerValidator,
  updateBannerValidator
});
const bannerService = require('../../../services/mongoDbService')({
  model:bannerModel,
  makeBanner
});
const makeBannerController = require('./banner');
const bannerController = makeBannerController({
  bannerService,
  makeBanner
});
module.exports = bannerController;
