const server = require('../models.js');
const Sequelize = require('sequelize');

const CommonCode = server.define('svCommonCode' , {
  //그룹코드 명
  groupName : {
    type : Sequelize.STRING(100),
    allowNull : false,
    primaryKey : true,
  },
  //코드명
  codeName : {
    type : Sequelize.STRING(100),
    allowNull : false,
    primaryKey : true,
  },
  //코드값
  codeValue : {
    type : Sequelize.STRING(100),
    allowNull : false
  },
  codeOrder : {
    type : Sequelize.INTEGER,
    allowNull : false
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
    CommonCode : CommonCode
}
