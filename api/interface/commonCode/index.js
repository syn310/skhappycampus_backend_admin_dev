const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./commonCode.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//그룹코드 조회
router.get('/', refreshController.refresh, controller.groupCodeList);

//그룹코드 하위의 코드 리스트 조회
router.get('/:groupName',  controller.show);

//그룹코드 하위의 코드 리스트 조회 with Option
router.get('/:groupName/:codeOption', controller.index);

//그룹코드 생성
router.post('/', refreshController.refresh, controller.create);

//그룹코드 삭제
router.delete('/:groupName',refreshController.refresh, controller.delete);

//코드 수정(해당 그룹코드 하위코드 전체 Delete & Insert)
router.put('/',refreshController.refresh, controller.codeUpdate);

//그룹코드 수정
router.put('/group',refreshController.refresh, controller.groupUpdate);

module.exports = router;
