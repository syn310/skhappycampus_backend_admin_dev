const models = require('../../model/applyUserStatus/ApplyUserStatus');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const querySequelize = require('../../model/models.js');

exports.show = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const query = "SELECT " +
                  "(select company.company_name from sv_companies company where company.company_id = statu.proceeding_company) as companyName, " +
                  "statu.proceeding_company as proceedingCompany, " +
                  "statu.document_status as documentStatus, " +
                  "statu.interview_status as interviewStatus, " +
                  "statu.final_status as finalStatus " +
                  "FROM " +
                  "sv_apply_user_statuses statu " +
                  "WHERE " +
                  "statu.apply_user_id =:applyUserId " +
                  "and statu.serial_number =:serialNumber; "
  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.SELECT,
    replacements: { serialNumber: serialNumber, applyUserId: applyUserId}
  }).then(applyUserStatus => {

    return res.status(200).json(applyUserStatus);
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json(err);
  });
};


exports.createStatus = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.ApplyUserStatus.create({
    serialNumber :serialNumber,
    applyUserId: applyUserId,
    documentStatus: "진행중",
    interviewStatus:"",
    finalStatus:"",
    createUserId: applyUserId,
    updateUserId: applyUserId
  }).then((applyUserStatus) => {
    return res.status(201).json(applyUserStatus)
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};
