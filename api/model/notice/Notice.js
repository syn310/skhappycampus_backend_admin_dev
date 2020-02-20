const server = require('../models.js');
const Sequelize = require('sequelize');

const Notice = server.define('svNotice' , {
  //사용자 아이디
  noticeSeq : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement: true
  },
  //카테고리
  noticeCategory : {
    type : Sequelize.STRING(20)
  },
  //제목
  noticeTitle : {
    type : Sequelize.STRING(35)
  },
  //내용
  noticeContent : {
    type : Sequelize.TEXT('long')
  },
  //지원자 공지여부
  applicantYn: {
    type: Sequelize.STRING(1)
  },
  //협력사 공지여부
  bpYn: {
    type: Sequelize.STRING(1)
  },
  //공지 삭제여부
  deleteYn: {
    type: Sequelize.STRING(1)
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


module.exports = {
  Notice : Notice
}
