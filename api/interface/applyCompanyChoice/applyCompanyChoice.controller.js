const models = require('../../model/applyCompanyChoice/ApplyCompanyChoice');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
require('date-utils');

// exports.index = (req,res) => {
//   const serialNumber = req.params.serialNumber || '';
//   const applyUserId = req.params.applyUserId || '';
//
//   if(!serialNumber.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
//   }
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   const query = "SELECT " +
//                   "apply.apply_user_id as applyUserId, " +
//                   "apply.region_code as regionCode, " +
//                   "apply.notice_number as noticeNumber, " +
//                   "notice.notice_name as noticeName, " +
//                   "notice.notice_start_datetime as noticeStartDatetime, " +
//                   "notice.notice_end_datetime as noticeEndDatetime, " +
//                   "notice.anounce_datetime as anounceDatetime, " +
//                   "notice.notice_status as noticeStatus " +
//                   "FROM " +
//                   "sv_applies apply ,sv_recruit_services notice " +
//                   "WHERE apply.serial_number = notice.serial_number" +
//                   "and apply.apply_user_id =:applyUserId;";
//
//   return querySequelize.query(query, {
//     type: querySequelize.QueryTypes.RAW,
//     replacements: { serialNumber: serialNumber, applyUserId: applyUserId}
//   }).spread(function(results){
//     return res.status(200).json(results);
//   }).catch(function (err) {
//       return res.status(500).json(err);
//   });
// };

exports.companyCheck = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.ApplyCompanyChoice.findOne({
    where: {
      serialNumber: serialNumber,
      applyUserId: applyUserId
    }
  }).then(companyChoice => {
      if (!companyChoice){
        return res.status(200).json({row: '0'});
      }
      return res.status(200).json({row: '1'});
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.create = (req,res) => {

  const serialNumber = req.body.serialNumber || '';
  const applyUserId = req.body.applyUserId || '';
  const firstCompany = req.body.firstCompany || '';
  const secondCompany = req.body.secondCompany || '';
  const thirdCompany = req.body.thirdCompany || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  models.ApplyCompanyChoice.create({
      serialNumber: serialNumber,
      applyUserId: applyUserId,
      firstCompany: firstCompany,
      secondCompany: secondCompany,
      thirdCompany: thirdCompany,
      createUserId: createUserId,
      updateUserId: updateUserId
  }).then((applyCompanyChoice) => res.status(201).json(applyCompanyChoice))
  .catch(function (err) {
      console.log(err);
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {

  const serialNumber = req.body.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
  const firstCompany = req.body.firstCompany || '';
  const secondCompany = req.body.secondCompany || '';
  const thirdCompany = req.body.thirdCompany || '';
  const createUserId = req.body.createUserId || '';
  const updateUserId = req.body.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')

  models.ApplyCompanyChoice.update({
      applyUserId: applyUserId,
      firstCompany: firstCompany,
      secondCompany: secondCompany,
      thirdCompany: thirdCompany,
      createUserId: createUserId,
      updateUserId: updateUserId,
      updateDatetime: time
  },{
    where: {serialNumber:serialNumber, applyUserId: applyUserId}
  }).then((applyCompanyChoice) => res.status(201).json(applyCompanyChoice))
  .catch(function (err) {
      console.log(err);
      res.status(500).json(err)
  });
};
