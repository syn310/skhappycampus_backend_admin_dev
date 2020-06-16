const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./book.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.index);

//router.get('/showUserBook', refreshController.refresh, controller.chooserBookList);

//router.get('/:bookId', controller.show);

//router.put('/cancelUserBook/:bookId', refreshController.refresh, controller.cancelUpdate);

router.put('/:bookId', refreshController.refresh, controller.complete);

module.exports = router;
