const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./applyEducation.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:serialNumber', refreshController.refresh, controller.show);

router.get('/:serialNumber/:applyUserId', refreshController.refresh, controller.showByUser);


module.exports = router;
