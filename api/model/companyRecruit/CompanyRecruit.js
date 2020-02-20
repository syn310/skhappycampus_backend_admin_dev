const server = require('../models.js');
const Sequelize = require('sequelize');

const CompanyRecruit = server.define('svCompanyRecruit' , {
  //협력사 아이디
  companyId : {
    type : Sequelize.STRING(300),
    allowNull : false,
    primaryKey : true
  },
  //시리얼 번호
  serialNumber   : {
    type : Sequelize.STRING(20),
    allowNull : false,
    primaryKey : true
  },
  //구인정보 순번
  recruitSeq : {
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true
  },
  //채용직무
  recruitJob : {
    type : Sequelize.STRING(300)
  },
  //채용인원
  recruitNumber : {
    type : Sequelize.INTEGER
  },
  //상세업무
  jobDetail : {
    type : Sequelize.STRING(500)
  },
  //우대사항
  preferencePoint : {
    type : Sequelize.STRING(500)
  },
  //선호학력
  preferDegree : {
    type : Sequelize.STRING(300)
  },
  //인턴급여
  internSalary : {
    type : Sequelize.STRING(300)
  },
  //정규직전환시연봉
  fulltimeSalary : {
    type : Sequelize.STRING(300)
  },
  //근무지
  workplace : {
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
  },
  //고용형태
  recruitType : {
    type : Sequelize.STRING(50)
  },
  //고용기간시작
  employStartDate : {
    type : Sequelize.STRING(10)
  },
  //고용기간끝
  employEndDate : {
    type : Sequelize.STRING(10)
  },
  //비고
  remark : {
    type : Sequelize.STRING(500)
  }
}, {underscored:true});


module.exports =  {
    CompanyRecruit : CompanyRecruit
}
