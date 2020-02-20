const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./dictionary.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', controller.index);

module.exports = router;
