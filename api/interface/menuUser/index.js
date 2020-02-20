const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./menu.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.index);
router.get('/menuid',refreshController.refresh, controller.menuid);

router.post('/',refreshController.refresh, controller.create);
router.put('/:userMenuId',refreshController.refresh, controller.update);

module.exports = router;
