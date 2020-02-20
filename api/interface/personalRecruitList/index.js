const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./personalRecruitList.controller');
const refreshController = require('../login/login.controller');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/detail/:serialNumber', refreshController.refresh, controller.detail);
router.get('/', refreshController.refresh, controller.index);
//router.get('/coverLetterAnalysis/:applyUserId/:serialNumber', controller.analysis)
router.get('/coverLetterAnalysis/:serialNumber', refreshController.refresh, controller.analysis)

module.exports = router;
