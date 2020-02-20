const server = require('../models.js');
const Sequelize = require('sequelize');

const User = server.define('svUser' , {
    //지역코드
//  regionCode : {
  //  type : Sequelize.STRING(2),
    //allowNull : false,
    //primaryKey : true
  //},
  //사용자 아이디
  userId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //사용자 비밀번호
  userPassword : {
    type : Sequelize.STRING(300),
    allowNull : false
  },
  //사용자 구분 (일반, 협력사, 관리자)
  userType : {
    type : Sequelize.STRING(100),
    allowNull : false,
    defaultValue : 'N'
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
    User : User
}
