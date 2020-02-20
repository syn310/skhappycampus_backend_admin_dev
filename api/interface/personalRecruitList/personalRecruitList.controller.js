const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const recommendController = require('../applyCompanyRecommend/applyCompanyRecommend.controller');
const companyModel = require('../../model/company/Company');
const config = require('../../../config/environments');

exports.index = (req,res) => {
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const query = "SELECT " +
                  "apply.apply_user_id as applyUserId, " +
                  "apply.serial_number as serialNumber, " +
                  "apply.apply_status as applyStatus, " +
                  "notice.notice_name as noticeName, " +
                  "notice.notice_pass_message as noticePassMessage, " +
                  "notice.notice_start_datetime as noticeStartDatetime, " +
                  "notice.notice_end_datetime as noticeEndDatetime, " +
                  "notice.document_result_date as documentResultDate, " +
                  "notice.interview_result_date as interviewResultDate, " +
                  "notice.notice_status as noticeStatus, " +
                  "notice.notice_image_path as noticeImagePath " +
                  "FROM " +
                  "sv_applies apply ,sv_recruit_notices notice " +
                  "WHERE apply.serial_number = notice.serial_number " +
                  "and apply.apply_user_id =:applyUserId; ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW,
    replacements: { applyUserId: applyUserId }
  }).spread(function(results){
    //console.log("asfasdfasdfasdfasdfasdf", results)
    return res.status(200).json(results);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

exports.analysis = (req,res) => {
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
  const serialNumber = req.params.serialNumber || '';

//const applyUserId = req.params.applyUserId || '';

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  let url = config.resturl.coverletter + serialNumber + "/" + applyUserId;
  //let url = "http://10.178.102.158:30082/analysis/" + serialNumber + "/" + applyUserId;
  //let url = "https://www.skhappycampus.com/analysis/" + serialNumber + "/" + applyUserId;
  //console.log("url ===========" + url);
  //let url = "https://172.21.109.197:30067/analysis/" + applyUserId + "/" + serialNumber;

  return commonUtil.getResultFromRest(url, function(err, result){
    if(!err){
      var resultInfo = JSON.parse(result);
      var companyList = [];
  
      var promise1 = new Promise(function (resolve, reject) {
        companyModel.Company.findOne({
          where: {
            companyId :resultInfo[0].company_id
          }
        }).then(companyInfo => {
          companyList.push(companyInfo);
          resolve(companyList);
        }).catch(function (err) {
          console.error(err); // Error 출력
        });
      });
  
      var promise2 = new Promise(function (resolve, reject) {
        companyModel.Company.findOne({
          where: {
            companyId :resultInfo[1].company_id
          }
        }).then(companyInfo => {
          companyList.push(companyInfo);
          resolve(companyList);
        }).catch(function (err) {
          console.error(err); // Error 출력
        });
      });
  
      var promise3 = new Promise(function (resolve, reject) {
        companyModel.Company.findOne({
          where: {
            companyId :resultInfo[2].company_id
          }
        }).then(companyInfo => {
          companyList.push(companyInfo);
          resolve(companyList);
        }).catch(function (err) {
          console.error(err); // Error 출력
        });
      });
  
      return Promise.all([promise1, promise2, promise3]).then(function (values) {
         return res.status(200).json(companyList);
      });
    }else{
      return res.status(500).json({error:systemMessage.analysis.error});
    }

  });
};

exports.detail = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const query = "select 'first' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.first_company = company.company_id " +
  "and choice.first_company = recruit.company_id " +
  "and choice.serial_number = recruit.serial_number " +
  "and choice.serial_number =:serialNumber " +
  "and choice.apply_user_id =:applyUserId " +
  "union all " +
  "select 'second' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.second_company = company.company_id " +
  "and choice.second_company = recruit.company_id " +
  "and choice.serial_number = recruit.serial_number " +
  "and choice.serial_number =:serialNumber " +
  "and choice.apply_user_id =:applyUserId " +
  "union all " +
  "select 'third' as priority, " +
  "company.company_id as companyId, " +
  "company.company_name as companyName, " +
  "recruit.recruit_job as recruitJob, " +
  "recruit.workplace as workplace, " +
  "recruit.fulltime_salary as fulltimeSalary " +
  "from sv_apply_company_choices choice, sv_companies company, sv_company_recruits recruit " +
  "where choice.third_company = company.company_id " +
  "and choice.third_company = recruit.company_id " +
  "and choice.serial_number = recruit.serial_number " +
  "and choice.serial_number =:serialNumber " +
  "and choice.apply_user_id =:applyUserId; ";

  return querySequelize.query(query, {
    replacements: { serialNumber:serialNumber, applyUserId:applyUserId},
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    console.log(results);
    return res.status(200).json(results);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};
