const server = require('../models.js');
const Sequelize = require('sequelize');

const RecruitNotice = server.define('svRecruitNotice' , {

  //시리얼 번호
  serialNumber   : {
    type : Sequelize.STRING(20),
    allowNull : false,
    primaryKey : true
  },
  //공고명
  noticeName : {
    type : Sequelize.STRING(500),
    allowNull : false
  },
  //공고 시작일시
  noticeStartDatetime : {
    type : Sequelize.STRING(10)
  },
  //공고 종료일시
  noticeEndDatetime : {
    type : Sequelize.STRING(10)
  },
  //교육 시작일자
  studyStartDate : {
    type : Sequelize.STRING(10)
  },
  //교육 종료일자
  studyEndDate : {
    type : Sequelize.STRING(10)
  },
  //인턴십 시작일자
  internStartDate : {
    type : Sequelize.STRING(10)
  },
  //인턴십 종료일자
  internEndDate : {
    type : Sequelize.STRING(10)
  },
  //서류발표일
  documentResultDate : {
    type : Sequelize.STRING(10)
  },
  //면접발표일
  interviewResultDate : {
    type : Sequelize.STRING(10)
  },
  //공고상태
  noticeStatus : {
    type : Sequelize.STRING(100),
    allowNull : false,
    defaultValue : '시작전'
  },
  //공고이미지경로
  noticeImagePath : {
    type : Sequelize.STRING(500)
  },
  //생성날짜
  createDatetime : {
    type : Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //생성자아이디
  createUserId : {
    type : Sequelize.STRING(300)
  },
  //수정날짜
  updateDatetime : {
    type :  Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //수정자아이디
  updateUserId : {
    type : Sequelize.STRING(300)
  },
  //공고알림
  noticePassMessage : {
    type : Sequelize.TEXT('long')
  },
  //비고
  description : {
    type : Sequelize.STRING(300)
  },
  //삭제여부
  deleteYn : {
    type : Sequelize.STRING(1),
    defaultValue : "N"
  },
}, {underscored:true});


module.exports = {
    RecruitNotice : RecruitNotice
}
