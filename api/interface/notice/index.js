const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./notice.controller');
const refreshController = require('../login/login.controller');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//공지사항 리스트 조회
router.get('/', refreshController.refresh, controller.index);

//공지사항 리스트 조회(with Paging)
router.get('/paging/:pageNum/:countPerPage', refreshController.refresh, controller.paging);

//공지사항 상세조회
router.get('/:noticeSeq', refreshController.refresh, controller.show);

router.delete('/:noticeSeq',refreshController.refresh, controller.destroy);

router.post('/', refreshController.refresh, controller.create);

router.put('/:noticeSeq',refreshController.refresh, controller.update);

module.exports = router;
