const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const controller = require('./faq.controller');
const refreshController = require('../login/login.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',refreshController.refresh, controller.index);

router.get('/:faqSeq',refreshController.refresh, controller.show);

// router.delete('/:faqSeq', controller.destroy);

router.post('/', refreshController.refresh, controller.create);

router.put('/:faqSeq',refreshController.refresh, controller.update);
router.put('/delete/:faqSeq',refreshController.refresh, controller.delete);

module.exports = router;
