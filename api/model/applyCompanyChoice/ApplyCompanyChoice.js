const server = require('../models.js');
const Sequelize = require('sequelize');

const ApplyCompanyChoice = server.define('svApplyCompanyChoice' , {

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
  //1지망 협력사
  firstCompany : {
    type : Sequelize.STRING(300)
  },
  //2지망 협력사
  secondCompany : {
    type : Sequelize.STRING(300)
  },
  //3지망 협력사
  thirdCompany : {
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
    ApplyCompanyChoice : ApplyCompanyChoice
}
