const server = require('../models.js');
const Sequelize = require('sequelize');

const Faq = server.define('svFaq' , {
  //사용자 아이디
  faqSeq : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement: true
  },
  //카테고리
  faqCategory : {
    type : Sequelize.STRING(20)
  },
  //question
  faqQuestion : {
    type : Sequelize.STRING(300)
  },
  //answer
  faqAnswer : {
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
  //삭제여부
  deleteYn : {
    type : Sequelize.STRING(1),
    defaultValue : "N"
  }
}, {underscored:true});


module.exports = {
    Faq : Faq
}
