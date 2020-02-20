const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const querySequelize = require('../../model/models.js');
const models = require('../../model/applyUserCompanyStatus/ApplyUserCompanyStatus');

require('date-utils');

exports.index = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const query = "select 'first' as priority, " +
                  "(select company.company_name from sv_companies company where company.company_id = statu.company_id) as companyName, " +
                  "statu.company_id as companyId, " +
                  "statu.document_status as documentStatus, " +
                  "statu.interview_status as interviewStatus, " +
                  "statu.final_status as finalStatus, " +
                  "statu.interview_date as interviewDate " +
                  "FROM " +
                  "sv_apply_user_company_statuses statu , sv_apply_company_choices companyChoice " +
                  "WHERE " +
                  "statu.apply_user_id =:applyUserId " +
                  "and statu.serial_number =:serialNumber " +
                  "and statu.serial_number = companyChoice.serial_number " +
                  "and statu.apply_user_id = companyChoice.apply_user_id " +
                  "and statu.company_id = companyChoice.first_company " +
                  "union all " +
                "select 'second' as priority, " +
                  "(select company.company_name from sv_companies company where company.company_id = statu.company_id) as companyName, " +
                  "statu.company_id as companyId, " +
                  "statu.document_status as documentStatus, " +
                  "statu.interview_status as interviewStatus, " +
                  "statu.final_status as finalStatus, " +
                  "statu.interview_date as interviewDate " +
                  "FROM " +
                  "sv_apply_user_company_statuses statu , sv_apply_company_choices companyChoice " +
                  "WHERE " +
                  "statu.apply_user_id =:applyUserId " +
                  "and statu.serial_number =:serialNumber " +
                  "and statu.serial_number = companyChoice.serial_number " +
                  "and statu.apply_user_id = companyChoice.apply_user_id " +
                  "and statu.company_id = companyChoice.second_company " +
                  "union all " +
                "select 'third' as priority, " +
                  "(select company.company_name from sv_companies company where company.company_id = statu.company_id) as companyName, " +
                  "statu.company_id as companyId, " +
                  "statu.document_status as documentStatus, " +
                  "statu.interview_status as interviewStatus, " +
                  "statu.final_status as finalStatus, " +
                  "statu.interview_date as interviewDate " +
                  "FROM " +
                  "sv_apply_user_company_statuses statu , sv_apply_company_choices companyChoice " +
                  "WHERE " +
                  "statu.apply_user_id =:applyUserId " +
                  "and statu.serial_number =:serialNumber " +
                  "and statu.serial_number = companyChoice.serial_number " +
                  "and statu.apply_user_id = companyChoice.apply_user_id " +
                  "and statu.company_id = companyChoice.third_company; "
  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW,
    replacements: { serialNumber: serialNumber, applyUserId: applyUserId}
  }).spread(function(applyUserStatus){
    console.log("결과" + applyUserStatus);
    return res.status(200).json(applyUserStatus);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};