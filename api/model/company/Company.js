const server = require('../models.js');
const Sequelize = require('sequelize');

const Company = server.define('svCompany' , {
  //협력사 아이디
  companyId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //협력사명
  companyName : {
    allowNull : false,
    type : Sequelize.STRING(300)
  },
  //협력사 소개
  companyGuide : {
    type : Sequelize.STRING(2000)
  },
  //홈페이지 주소
  companyUrl : {
    type : Sequelize.STRING(300)
  },
  //협력사 주소
  companyAddress : {
    type : Sequelize.STRING(500)
  },
  //연락담당자
  contactPerson : {
    type : Sequelize.STRING(500)
  },
  //연락처
  contactPhone : {
    type : Sequelize.STRING(500)
  },
  //업종
  companyType : {
    type : Sequelize.STRING(500)
  },
  //종업원수
  employeeNumber : {
    type : Sequelize.STRING(500)
  },
  //종업원수 기준일자
  employeeNumberDate : {
    type : Sequelize.DATE
  },
  //매출액
  sales : {
    type : Sequelize.STRING(500)
  },
  //매출액 기준일자
  salesDate : {
    type : Sequelize.DATE
  },
  //평균연봉
  averageSalary : {
    type : Sequelize.STRING(500)
  },
  //평균연봉 기준일자
  averageSalaryDate : {
    type : Sequelize.DATE
  },
  //인재상
  idealType : {
    type : Sequelize.STRING(500)
  },
  //협력사 로고 이미지 주소
  companyLogoUrl : {
    type : Sequelize.STRING(500)
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
    Company : Company
}
