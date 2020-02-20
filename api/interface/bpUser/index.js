const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./bpUser.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//협력사 리스트 조회
router.get('/',refreshController.refresh, controller.index);

//협력사 정보 업데이트(가입승인, 대표관리자여부)
router.put('/', refreshController.refresh, controller.update);
// router.get('/:regionCode/:userId', controller.show);
//
router.delete('/:userId',refreshController.refresh, controller.destroy);

module.exports = router;
