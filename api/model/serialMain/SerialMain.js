const server = require('../models.js');
const Sequelize = require('sequelize');

const SerialMain = server.define('svSerialMain' , {
    //시리얼번호
  serialNumber : {
    type : Sequelize.STRING(20),
    allowNull : false,
    primaryKey : true
  },
  //코드이름
  codeName : {
    type : Sequelize.STRING(100),
    allowNull : false,
    primaryKey : true
  },
  //코드
  codeValue : {
    type : Sequelize.STRING(100),
    allowNull : false,
    primaryKey : true
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
    SerialMain : SerialMain
}
