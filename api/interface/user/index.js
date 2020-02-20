const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./user.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//일반 사용자 리스트 조회
router.get('/',refreshController.refresh, controller.index);

router.get('/dupleCheck/:userId', controller.dupleCheck);

// router.get('/:regionCode/:userId', controller.show);
//
// router.delete('/:regionCode/:userId', controller.destroy);
//
/** 사용자 추가 */
router.post('/', controller.create);

/** 사용자 패스워드 변경 */
router.put('/changePassword', refreshController.refresh, controller.changePassword);

module.exports = router;
