const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./apply.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//router.get('/', controller.index);

router.put('/updateUserStatus/:serialNumber', refreshController.refresh, controller.statusUpdate);

router.get('/userCheck/:serialNumber', refreshController.refresh, controller.userCheck);

router.put('/coverLetter/:serialNumber', refreshController.refresh, controller.resumeUpdate);

router.get('/:serialNumber', refreshController.refresh, controller.show);

router.get('/:serialNumber/:applyUserId',refreshController.refresh, controller.show);


//router.delete('/:serialNumber/:applyUserId', controller.destroy);

router.post('/', refreshController.refresh, controller.create);

//router.put('/:serialNumber', controller.update);

module.exports = router;
