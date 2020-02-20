const models = require('../../model/applyCertificate/ApplyCertificate');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');

exports.show = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.ApplyCertificate.findAll({
    where: {
      serialNumber: serialNumber,
      applyUserId: applyUserId
    }
  }).then(applyCertificates => {
      if (!applyCertificates){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(applyCertificates);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};


exports.showByUser = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = req.params.applyUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.ApplyCertificate.findAll({
    where: {
      serialNumber: serialNumber,
      applyUserId: applyUserId
    }
  }).then(applyCertificates => {
      if (!applyCertificates){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(applyCertificates);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};
