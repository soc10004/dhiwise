const express = require('express');
const router =  express.Router();

router.use(require('./admin/index'));
router.use(require('./device/index'));
router.use(require('./client/index'));

module.exports = router;
