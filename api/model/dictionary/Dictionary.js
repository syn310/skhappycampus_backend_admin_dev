const server = require('../models.js');
const Sequelize = require('sequelize');

const Dictionary = server.define('svDictionary' , {
  //협력사 아이디
  companyId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //키워드
  keyword : {
    type : Sequelize.STRING(300),
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


module.exports =  {
    Dictionary : Dictionary
}
