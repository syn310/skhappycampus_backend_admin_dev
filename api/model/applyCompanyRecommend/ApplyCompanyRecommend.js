const server = require('../models.js');
const Sequelize = require('sequelize');

const ApplyCompanyRecommend = server.define('svApplyCompanyRecommend' , {

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
  //협력사아이디
  companyId : {
    type : Sequelize.STRING(300),
    allowNull : false
  },
  //추천순위
  recommendRank : {
    type : Sequelize.INTEGER
  }
}, {underscored:true});


module.exports =  {
    ApplyCompanyRecommend : ApplyCompanyRecommend
}
