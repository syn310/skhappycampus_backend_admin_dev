const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./company.controller');
const refreshController = require('../login/login.controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.index);

router.get('/:companyId',refreshController.refresh, controller.show);

module.exports = router;
