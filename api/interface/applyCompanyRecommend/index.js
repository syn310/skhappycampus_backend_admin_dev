const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./applyCompanyRecommend.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
