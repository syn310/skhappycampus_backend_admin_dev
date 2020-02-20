const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./recruitNotice.controller');
const refreshController = require('../login/login.controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',refreshController.refresh, controller.index);

router.get('/:serialNumber',refreshController.refresh,  controller.show);

router.get('/summary/:serialNumber',refreshController.refresh,  controller.summary);

router.get('/today/:serialNumber',refreshController.refresh,  controller.todaySummary);

router.get('/companyRank/:serialNumber',refreshController.refresh,  controller.companyRank);

router.get('/schoolRank/:serialNumber',refreshController.refresh,  controller.schoolRank);

router.get('/applyUserList/:serialNumber',refreshController.refresh,  controller.applyUserList);

router.post('/', refreshController.refresh, controller.create);

router.put('/:serialNumber',refreshController.refresh,  controller.update);

router.put('/delete/:serialNumber',refreshController.refresh,  controller.delete);

// router.delete('/:serialNumber', controller.destroy);



module.exports = router;
