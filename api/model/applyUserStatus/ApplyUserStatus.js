const server = require('../models.js');
const Sequelize = require('sequelize');

const ApplyUserStatus = server.define('svApplyUserStatus' , {
  //시리얼 번호
  serialNumber : {
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
  //전형 진행중인 회사
  proceedingCompany : {
    type : Sequelize.STRING(300)
  },
  //서류전형 상태
  documentStatus : {
    type : Sequelize.STRING(100)
  },
  //면접전형 상태
  interviewStatus : {
    type : Sequelize.STRING(100)
  },
  //최종결과 상태
  finalStatus : {
    type : Sequelize.STRING(100)
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
  }

}, {underscored:true});

module.exports =  {
  ApplyUserStatus : ApplyUserStatus
}
