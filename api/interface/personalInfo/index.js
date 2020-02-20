const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./personalInfo.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', refreshController.refresh, controller.create);

router.put('/:serialNumber', refreshController.refresh, controller.update);

module.exports = router;
