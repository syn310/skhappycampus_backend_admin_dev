const models = require('../../model/recruitNotice/RecruitNotice');
const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.index = (req,res) => {
  return models.RecruitNotice.findAll({
    where: {
      deleteYn: "N"
    },
    order: [['createDatetime', 'DESC']]
  })
  .then(recruitNotices => res.json(recruitNotices))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

exports.show = (req,res) => {
  const serialNumber = req.params.serialNumber || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }


  return models.RecruitNotice.findOne({
    where: {
      serialNumber: serialNumber
    }
  }).then(recruitNotice => {
      if (!recruitNotice){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(recruitNotice);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
  };




  exports.summary = (req,res) => {

    const serialNumber = req.params.serialNumber || '';
    // const applyUserId = req.params.applyUserId || '';
  
    const query =
    "select " +
      "(select " + 
      "count(*) " + 
      "from sv_applies " +
      "where serial_number =:serialNumber) as total, " +
      "(select count(*) " +
      "from sv_applies " +
      "where apply_status = 7 " +
      "and serial_number =:serialNumber) as complete, " +
      "(select count(*) from (select apply_user_id " +
      "from sv_apply_user_company_statuses " +
      "where document_status = '합격' " +
      "and serial_number =:serialNumber " +
      "group by serial_number, apply_user_id) as doc) as document, " +
      "(select count(*) from (select apply_user_id " +
      "from sv_apply_user_company_statuses " +
      "where document_status = '합격'  " +
      "and interview_status = '합격' " +
      "and serial_number =:serialNumber " +
      "group by serial_number, apply_user_id) as inter) as interview, " +
      "(select count(*) from (select apply_user_id " +
      "from sv_apply_user_company_statuses " +
      "where document_status = '합격'  " +
      "and interview_status = '합격' " +
      "and final_status = '합격' " +
      "and serial_number =:serialNumber " +
      "group by serial_number, apply_user_id) as fin) as final " +      
    "from dual ;" ;
  
      return querySequelize.query(query, {
        type: querySequelize.QueryTypes.RAW,
        replacements: { serialNumber:serialNumber }
      }).spread(function(results){
        return res.status(200).json(results);
      }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
      });
  };
  

  exports.todaySummary = (req,res) => {

    const serialNumber = req.params.serialNumber || '';
    // const applyUserId = req.params.applyUserId || '';
  
    const query =
    "select " +
      "(select " + 
      "count(*) " +
      "from sv_applies " +
      "where serial_number =:serialNumber " +
      "and apply_status in ('1','2','3') " +
      "and date_format(update_datetime, '%Y%m%d') = date_format(SYSDATE(), '%Y%m%d') ) as applying, " +
      "(select  " +
      "count(*) " +
      "from sv_applies " +
      "where serial_number =:serialNumber " +
      "and apply_status = '4' " +
      "and date_format(update_datetime, '%Y%m%d') = date_format(SYSDATE(), '%Y%m%d'))  as resume, " +
      "(select  " +
      "count(*) " +
      "from sv_applies " +
      "where serial_number =:serialNumber " +
      "and apply_status in ('5', '6') " +
      "and date_format(update_datetime, '%Y%m%d') = date_format(SYSDATE(), '%Y%m%d')) as choice, " +
      "(select  " +
      "count(*) " +
      "from sv_applies " +
      "where serial_number =:serialNumber " +
      "and apply_status = '7' " +
      "and date_format(update_datetime, '%Y%m%d') = date_format(SYSDATE(), '%Y%m%d')) as submit  " +
    "from dual; "
  
      return querySequelize.query(query, {
        type: querySequelize.QueryTypes.RAW,
        replacements: { serialNumber:serialNumber }
      }).spread(function(results){
        return res.status(200).json(results);
      }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
      });
  };

  exports.companyRank = (req,res) => {

    const serialNumber = req.params.serialNumber || '';
    // const applyUserId = req.params.applyUserId || '';
  
    const query =
    "select " +
      "company_id as companyId, " +
      "company_name as companyName, " +
      "recruit_number as recruitNumber, " +
      "count(company_id) as cnt, " + 
      "sum(first) as first, " +
      "sum(second) as second, " +
      "sum(third) as third " +
    "from (" +
      "select " +
        "sc.company_id, " +
        "cp.company_name, " +
        "sr.recruit_number, " +
        "(select count(f.first_company) from sv_apply_company_choices f where f.serial_number = sc.serial_number and f.apply_user_id = sc.apply_user_id and f.first_company = sc.company_id) as first, " +
        "(select count(s.second_company) from sv_apply_company_choices s where s.serial_number = sc.serial_number and s.apply_user_id = sc.apply_user_id and s.second_company = sc.company_id) as second, " +
        "(select count(t.third_company) from sv_apply_company_choices t where t.serial_number = sc.serial_number and t.apply_user_id = sc.apply_user_id and t.third_company = sc.company_id) as third " +
      "from sv_apply_user_company_statuses sc, sv_company_recruits sr, sv_companies cp " +
      "where sc.company_id = sr.company_id " +
        "and sc.serial_number = sr.serial_number " +
        "and sc.serial_number =:serialNumber " +
        "and sc.company_id = cp.company_id " +
      ") cr " +
      "group by company_id " +
      "order by cnt desc, first desc, second desc, third desc;" 

      return querySequelize.query(query, {
        type: querySequelize.QueryTypes.RAW,
        replacements: { serialNumber:serialNumber }
      }).spread(function(results){
        return res.status(200).json(results);
      }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
      });
  };


  exports.schoolRank = (req,res) => {

    const serialNumber = req.params.serialNumber || '';
    // const applyUserId = req.params.applyUserId || '';
  
    const query =
    "select " +
      "sve.school_name as schoolName,  " +
      "count(sve.school_name) as schoolCnt " +
      "from sv_apply_educations sve,  " +
      "(select se.apply_user_id, max(se.education_seq) as maxSeq from sv_applies sa, sv_apply_educations se " +
      "where sa.apply_status = 7 " +
      "and sa.apply_user_id = se.apply_user_id " +
      "group by se.apply_user_id) info " +
      "where sve.apply_user_id = info.apply_user_id " +
      "and sve.education_seq = info.maxSeq " +
      // 고등학교 최종학력도 집계될 수 있도록 수정
      // "and info.maxSeq > 1 " +
      "and sve.serial_number =:serialNumber " +
    "group by sve.school_name ";
  
      return querySequelize.query(query, {
        type: querySequelize.QueryTypes.RAW,
        replacements: { serialNumber:serialNumber }
      }).spread(function(results){
        return res.status(200).json(results);
      }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
      });
  };


  exports.applyUserList = (req,res) => {
    const serialNumber = req.params.serialNumber || '';
  
    if(!serialNumber.length){
      return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
    }
  
    const query = 
    "select " +
    "	sa.serial_number as serialNumber, " +  
    "	sa.apply_user_id as applyUserId, " +  
    "	sa.apply_birth as applyBirth, " +  
    "	sa.apply_name as applyName, " +  
    "	(select school_name " +  
    "	from sv_apply_educations se " +   
    "	where se.apply_user_id = sa.apply_user_id " +  
    "	and se.serial_number = sa.serial_number " +  
    "	and se.education_seq = ( select max(education_seq) from sv_apply_educations where apply_user_id = sa.apply_user_id ) " +  
    "	) as applySchool, " +  
    "	case when sa.apply_status = 0 " +
    "		then '자격확인' " +
    "		when sa.apply_status = 1 " +
    "		then '정보동의' " +
    "		when sa.apply_status = 2 " +
    "		then '실명인증' " +
    "		when sa.apply_status = 3 " +
    "		then '정보입력중' " +
    "		when sa.apply_status = 4 " +
    "		then '자소서작성' " +
    "		when sa.apply_status = 5 " +
    "		then '회사선택중' " +
    "		when sa.apply_status = 6 " +
    "		then '제출검토중' " +
    "		when sa.apply_status = 7 " +
    "		then '제출완료' " +
    "		else 'Error' end as applyStatus, " +
    "	sa.create_Datetime as createDatetime, " +
    "	(select company_name from sv_companies where company_id = sc.first_company) as firstCompany, " +
    "	(select company_name from sv_companies where company_id = sc.second_company) as secondCompany, " +
    "	(select company_name from sv_companies where company_id = sc.third_company) as thirdCompany " +
    "from sv_applies sa " +
    "left join sv_apply_company_choices sc " +
    "on sa.serial_number = sc.serial_number and sa.apply_user_id = sc.apply_user_id " +
    "where sa.serial_number =:serialNumber " +
    "group by sa.apply_user_id " +
    "order by sa.create_datetime desc; " ;
  
      return querySequelize.query(query, {
        type: querySequelize.QueryTypes.RAW,
        replacements: { serialNumber: serialNumber }
      }).spread(function(results){
        return res.status(200).json(results);
      }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
      });
  
    };


// exports.destroy = (req, res) => {
//   const serialNumber = req.params.serialNumber || '';
//
//   if(!serialNumber.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
//   }
//
//   return models.RecruitNotice.findOne({
//     where: {
//       serialNumber: serialNumber
//     }
//   }).then((recruitNotice)=>{
//     if(recruitNotice == null){
//       return res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       return models.RecruitNotice.destroy({
//         where: {
//           serialNumber: serialNumber
//         }
//       }).then(() => res.status(200).json(systemMessage.delete.success))
//       .catch(function (err) {
//             return res.status(500).json(err);
//       });
//     }
//   })
// };

exports.create = (req,res) => {
  // let numberIdx = null;
  const serialNumber = req.body.recruitInfo.serialNumber || '';
  const noticeName = req.body.recruitInfo.noticeName || '';
  const noticeStartDatetime = commonUtil.transDateFormat(req.body.recruitInfo.noticeStartDatetime) || '';
  const noticeEndDatetime = commonUtil.transDateFormat(req.body.recruitInfo.noticeEndDatetime) || '';
  const documentResultDate = commonUtil.transDateFormat(req.body.recruitInfo.documentResultDate) || '';
  const interviewResultDate = commonUtil.transDateFormat(req.body.recruitInfo.interviewResultDate) || '';
  const internStartDate = commonUtil.transDateFormat(req.body.recruitInfo.internStartDate) || '';
  const internEndDate = commonUtil.transDateFormat(req.body.recruitInfo.internEndDate) || '';
  const noticeStatus = req.body.recruitInfo.noticeStatus || '';
  const noticeImagePath = req.body.recruitInfo.noticeImagePath || '';
  const createUserId = req.body.recruitInfo.createUserId || '';
  const updateUserId = req.body.recruitInfo.updateUserId || '';
  const description = req.body.recruitInfo.description || '';


  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!noticeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
  }

  if(!noticeStartDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
  }

  if(!noticeEndDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
  }

  if(!noticeStatus.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
  }

  models.RecruitNotice.findAll({
    where:{
        serialNumber: {
            [Op.like]: serialNumber + "%"
        }
    }
  })
  .then( result => {

      let numberIdx = result.length ;
          
      return models.RecruitNotice.create({
          serialNumber : serialNumber + "-" + numberIdx,
          noticeName : noticeName,
          noticeStartDatetime : noticeStartDatetime,
          noticeEndDatetime : noticeEndDatetime,
          documentResultDate : documentResultDate,
          interviewResultDate : interviewResultDate,
          internStartDate : internStartDate,
          internEndDate : internEndDate,
          noticeStatus : noticeStatus,
          noticeImagePath : noticeImagePath,
          createUserId : createUserId,
          updateUserId : updateUserId,
          deleteYn: "N",
          description: description
      }).then((recruitNotice) => res.status(201).json(recruitNotice))
      .catch(function (err) {
          console.log(err);
          return res.status(500).json(err);
      });

  })
  .catch( err => {
      console.log(err)
  })


};


exports.update = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const noticeName = req.body.recruitInfo.noticeName || '';
  const noticeStartDatetime = commonUtil.transDateFormat(req.body.recruitInfo.noticeStartDatetime) || '';
  const noticeEndDatetime = commonUtil.transDateFormat(req.body.recruitInfo.noticeEndDatetime) || '';
  const documentResultDate = commonUtil.transDateFormat(req.body.recruitInfo.documentResultDate) || '';
  const interviewResultDate = commonUtil.transDateFormat(req.body.recruitInfo.interviewResultDate) || '';
  const internStartDate = commonUtil.transDateFormat(req.body.recruitInfo.internStartDate) || '';
  const internEndDate = commonUtil.transDateFormat(req.body.recruitInfo.internEndDate) || '';
  const noticeStatus = req.body.recruitInfo.noticeStatus || '';
  const noticeImagePath = req.body.recruitInfo.noticeImagePath || '';
  // const createUserId = req.body.recruitInfo.createUserId || '';
  const updateUserId = req.body.recruitInfo.updateUserId || '';
  const description = req.body.recruitInfo.description || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!noticeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeName" , req:noticeName});
  }

  if(!noticeStartDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStartDatetime" , req:noticeStartDatetime});
  }

  if(!noticeEndDatetime.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeEndDatetime" , req:noticeEndDatetime});
  }

  if(!noticeStatus.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeStatus" , req:noticeStatus});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.RecruitNotice.update({
    noticeName : noticeName,
    noticeStartDatetime : noticeStartDatetime,
    noticeEndDatetime : noticeEndDatetime,
    documentResultDate: documentResultDate,
    interviewResultDate : interviewResultDate,
    internStartDate : internStartDate,
    internEndDate : internEndDate,
    noticeStatus : noticeStatus,
    noticeImagePath : noticeImagePath,
    // createUserId : createUserId,
    updateUserId : updateUserId,
    updateDatetime: time,
    description: description

  } , {
    where: {
      serialNumber: serialNumber,
    }
  }).then(()=>{
      return models.RecruitNotice.findOne({
        where: {
          serialNumber: serialNumber
        }
     });
   }).then((recruitNotice) => {
     if(recruitNotice == null) {
       return res.status(404).json(systemMessage.search.targetMissing);
     }else{
       return res.status(200).json(recruitNotice);
     }
    })
   .catch(function (err) {
       return res.status(500).json(err);
   });
};


exports.delete = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const updateUserId = req.body.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.RecruitNotice.update({
    updateUserId : updateUserId,
    updateDatetime: time,
    deleteYn: "Y"
  } , {
    where: {
      serialNumber: serialNumber,
    }
  }).then(()=>{
      return models.RecruitNotice.findOne({
        where: {
          serialNumber: serialNumber
        }
     });
   }).then((recruitNotice) => {
     if(recruitNotice == null) {
       return res.status(404).json(systemMessage.search.targetMissing);
     }else{
       return res.status(200).json(recruitNotice);
     }
    })
   .catch(function (err) {
       return res.status(500).json(err);
   });
};
