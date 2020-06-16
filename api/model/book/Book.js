const server = require('../models.js');
const Sequelize = require('sequelize');

const Book = server.define('svBook' , {
  //책 아이디
  bookId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //책 이름
  bookName : {
    allowNull : false,
    type : Sequelize.STRING(300)
  },
  //책 소개
  bookGuide : {
    type : Sequelize.STRING(2000)
  },
  //책 표지 이미지 주소
  bookCoverUrl : {
    type : Sequelize.STRING(500)
  },
  //책 저자
  bookWriter : {
    type : Sequelize.STRING(500)
  },
  //책을 찜한 사용자
  chooserId : {
    type : Sequelize.STRING(300)
  },
  //책을 찜한 날짜
  chooseDatetime : {
    type : Sequelize.DATE,
    defaultValue : Sequelize.NOW
  },
  //나눔 여부 
  completeYn : {
    type : Sequelize.STRING(10),
    defaultValue : 'N'
  },
  //나눔날짜
  completeDatetime : {
    type : Sequelize.DATE,
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
    Book : Book
}
