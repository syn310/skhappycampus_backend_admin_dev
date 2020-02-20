const server = require('../models.js');
const Sequelize = require('sequelize');

const Qna = server.define('svQna' , {
  //사용자 아이디
  qnaSeq : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement: true
  },
  //카테고리
  qnaCategory : {
    type : Sequelize.STRING(20)
  },
  //문의제목
  qnaTitle : {
    type : Sequelize.STRING(1000)
  },
  //문의내용
  qnaQuestion : {
    type : Sequelize.STRING(300)
  },
  //answer
  qnaAnswer : {
    type : Sequelize.STRING(300)
  }
  //생성날짜
  ,createDatetime : {
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
  //답변날짜
  answerDatetime : {
    type :  Sequelize.DATE
  },
  //삭제여부
  answerYn : {
    type : Sequelize.STRING(1),
    defaultValue : "N"
  },
  //삭제여부
  deleteYn : {
    type : Sequelize.STRING(1),
    defaultValue : "N"
  }
}, {underscored:true});


module.exports = {
    Qna : Qna
}
