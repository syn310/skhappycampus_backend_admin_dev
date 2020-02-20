const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./companyRecruit.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:serialNumber', refreshController.refresh, controller.index);

module.exports = router;
