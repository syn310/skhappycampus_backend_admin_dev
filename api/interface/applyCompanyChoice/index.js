const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./applyCompanyChoice.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//router.get('/', controller.index);

router.get('/companyCheck/:serialNumber', refreshController.refresh, controller.companyCheck);

router.post('/', refreshController.refresh, controller.create);

router.put('/:serialNumber', refreshController.refresh, controller.update);

module.exports = router;
