const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', require('./api/interface/user'));
app.use('/bpUser', require('./api/interface/bpUser'));
app.use('/apply', require('./api/interface/apply'));
app.use('/faq', require('./api/interface/faq'));
app.use('/qna', require('./api/interface/qna'));
app.use('/menuBp', require('./api/interface/menuBp'));
app.use('/menuUser', require('./api/interface/menuUser'));
app.use('/company', require('./api/interface/company'));
app.use('/recruitNotice', require('./api/interface/recruitNotice'));
app.use('/applyCompanyChoice', require('./api/interface/applyCompanyChoice'));
app.use('/companyRecruit', require('./api/interface/companyRecruit'));
app.use('/personalRecruitList', require('./api/interface/personalRecruitList'));
app.use('/personalInfo', require('./api/interface/personalInfo'));
app.use('/applyCompanyRecommend', require('./api/interface/applyCompanyRecommend'));
app.use('/applyEducation', require('./api/interface/applyEducation'));
app.use('/applyCertificate', require('./api/interface/applyCertificate'));
app.use('/login', require('./api/interface/login'));
app.use('/serialCode', require('./api/interface/serialCode'));
app.use('/commonCode', require('./api/interface/commonCode'));
app.use('/dictionary', require('./api/interface/dictionary'));
app.use('/authNice', require('./api/interface/niceAuth'));
app.use('/applyUserStatus', require('./api/interface/applyUserStatus'));
app.use('/applyUserCompanyStatus', require('./api/interface/applyUserCompanyStatus'));
app.use('/notice', require('./api/interface/notice'));
app.use('/mailTemplate', require('./api/interface/mailTemplate'));
app.use('/book', require('./api/interface/book'));

//CORS설정
app.use(cors());

module.exports = app;
