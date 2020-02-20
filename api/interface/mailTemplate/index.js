const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./mailTemplate.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.list);
router.get('/templateNumber',refreshController.refresh, controller.templateNumber);

router.post('/',refreshController.refresh, controller.create);
router.put('/:templateNumber',refreshController.refresh, controller.update);

router.put('/delete/:templateNumber',refreshController.refresh, controller.delete);

module.exports = router;
