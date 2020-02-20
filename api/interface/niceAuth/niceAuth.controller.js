const models = require('../../model/niceAuth/NiceAuth');
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

  return models.NiceAuth.findOne({
    where: {
      serialNumber: serialNumber,
      applyUserId: applyUserId
    }
  }).then(niceAuth => {
      if (!niceAuth){
        return res.json("X");
      }
      return res.json(niceAuth.dupYn);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};


exports.refreshNice = (req,res) => {
  return res.status(201).json("nice_auth token refresh complete!");
};
