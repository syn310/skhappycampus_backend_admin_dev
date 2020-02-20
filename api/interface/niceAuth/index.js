const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./niceAuth.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:serialNumber', refreshController.refresh, controller.show);
router.get('/refreshNice/:serialNumber', refreshController.refresh, controller.refreshNice);
module.exports = router;
