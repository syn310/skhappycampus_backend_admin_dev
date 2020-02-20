const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', controller.login);
router.get('/refresh', controller.refresh);
router.post('/delete', controller.delete);

module.exports = router;
