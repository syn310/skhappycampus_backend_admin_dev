const server = require('../models.js');
const Sequelize = require('sequelize');


const Menu = server.define('svMenu' , {
  menuId : {
    type : Sequelize.STRING(11),
    allowNull : false,
    primaryKey : true,
    // autoIncrement: true
  },
  menuName : {
    type : Sequelize.STRING(50),
    allowNull : false
  },
  depth : {
    type : Sequelize.INTEGER,
    allowNull : false
  },
  url : {
    type : Sequelize.STRING(50)
  },
  subUrl : {
    type : Sequelize.STRING(50)
  },
  parent : {
    type : Sequelize.STRING(11)
  },
  showYn : {
    type : Sequelize.STRING(1)
  },
  useYn : {
    type : Sequelize.STRING(1)
  },
  ord : {
    type : Sequelize.INTEGER
  },
  needLoginYn : {
    type : Sequelize.STRING(1)
  },
  mainShowYn : {
    type : Sequelize.STRING(1)
  },
  mainDescription : {
    type : Sequelize.STRING(100)
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
  },

}, {underscored:true});


module.exports =  {
    MenuUser : Menu
}
