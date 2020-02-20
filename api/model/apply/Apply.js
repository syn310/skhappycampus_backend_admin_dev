const server = require('../models.js');
const Sequelize = require('sequelize');

const Apply = server.define('svApply' , {
  //시리얼 번호
  serialNumber   : {
    type : Sequelize.STRING(20),
    allowNull : false,
    primaryKey : true
  },
  //지원자 아이디
  applyUserId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //지원자명
  applyName : {
    type : Sequelize.STRING(300)
  },
  //지원자 국적
  applyNationality : {
    type : Sequelize.STRING(100)
  },
  //지원자 생년월일
  applyBirth : {
    type : Sequelize.STRING(200)
  },
  //지원자 성별
  applyGender : {
    type : Sequelize.STRING(10)
  },
  //지원자 이동전화
  applyPhone : {
    type : Sequelize.STRING(100)
  },
  //지원자 주소
  applyAddress : {
    type : Sequelize.STRING(500)
  },
  //장애여부
  disabilityYn : {
    type : Sequelize.STRING(10)
  },
  //병역여부
  militaryYn : {
    type : Sequelize.STRING(10)
  },
  //보훈대상여부
  veteransYn : {
    type : Sequelize.STRING(10)
  },
  //지원상태
  applyStatus : {
    type : Sequelize.STRING(10)
  },
  //자기소개서
  coverLetter : {
    type : Sequelize.TEXT('long')
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
  //지원동의시간
  applyAgrTime : {
    type : Sequelize.DATE
  }

}, {underscored:true});


module.exports =  {
    Apply : Apply
}
