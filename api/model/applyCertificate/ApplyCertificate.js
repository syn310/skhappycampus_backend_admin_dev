const server = require('../models.js');
const Sequelize = require('sequelize');

const ApplyCertificate = server.define('svApplyCertificate' , {

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
  //자격증정보순번
  certificateSeq : {
    type : Sequelize.STRING(10),
    allowNull : false,
    primaryKey : true
  },
  //자격내용
  certificateContent : {
    type : Sequelize.STRING(500)
  },
  //취득년월
  certificateDate : {
    type : Sequelize.STRING(10)
  },
  //등급
  certificateGrade : {
    type : Sequelize.STRING(300)
  },
  //발급기관
  certificateOrganization : {
    type : Sequelize.STRING(300)
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
    ApplyCertificate : ApplyCertificate
}
