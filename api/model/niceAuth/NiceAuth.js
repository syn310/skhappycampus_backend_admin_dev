const server = require('../models.js');
const Sequelize = require('sequelize');

const NiceAuth = server.define('svNiceAuth' , {
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
  cipherTime : {
    type : Sequelize.STRING(12)
  },
  requestNumber : {
    type : Sequelize.STRING(100)
  },
  responseNumber : {
    type : Sequelize.STRING(100)
  },
  authType : {
    type : Sequelize.STRING(1)
  },
  name : {
    type : Sequelize.STRING(100)
  },
  dupInfo : {
    type : Sequelize.STRING(100)
  },
  birthDate : {
    type : Sequelize.STRING(8)
  },
  gender : {
    type : Sequelize.STRING(1)
  },
  nationalInfo : {
    type : Sequelize.STRING(1)
  },
  dupYn : {
    type : Sequelize.STRING(1)
  }
}, {underscored:true});


module.exports =  {
    NiceAuth : NiceAuth
}
