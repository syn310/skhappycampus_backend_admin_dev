const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./qna.controller');
const refreshController = require('../login/login.controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', refreshController.refresh, controller.index);
router.get('/checkNewQna', refreshController.refresh,  controller.checkNewQna);
router.get('/:qnaSeq',refreshController.refresh,  controller.show);
router.put('/qnaAnswer/:qnaSeq',refreshController.refresh,  controller.qnaAnswer);
router.put('/delete/:qnaSeq',refreshController.refresh,  controller.delete);

module.exports = router;
