const models = require('../../model/mailTemplate/MailTemplate');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
const commonUtil = require('../common/commonUtil');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.list = (req,res) => {
 
  const query = 
  "select " +
  "	template_number as templateNumber, " +
  "	template as template " +
  "	from sv_mail_templates " +
  " order by template_number; ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    ////console.log(results);
    return res.status(200).json(results);
  }).catch(function (err) {
      ////console.log(err);
      return res.status(500).json(err);
  });

};

exports.show = (req,res) => {
  const id = req.params.id || '';

  if(!id.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "id", req:id});
  }


models.MailTemplate.findOne({
    where: {
      id: id,
    }
  }).then(menu => {
      if (!menu){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(menu);
    }).catch(function (err) {
        //console.log(err);
        return res.status(500).json(err);
    });
};


exports.templateNumber = (req,res) => {
 
  const query = 
  " select " +
  "	template_number as templateNumber, " +
  "	template as template " +
  " from sv_mail_templates " +
  " order by template_number; ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    ////console.log(results);
    return res.status(200).json(results);
  }).catch(function (err) {
      ////console.log(err);
      return res.status(500).json(err);
  });

};


exports.update = (req,res) => {
  const templateNumber = req.params.templateNumber || '';
  const template = req.body.tempInfo.template || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!templateNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "templateNumber" , req:templateNumber});
  }

  if(!template.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "template" , req:template});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.MailTemplate.update({
      templateNumber: templateNumber,
      template: template,
      updateDatetime: time,
      updateUserId: userId
  } , {
        where: {
          templateNumber: templateNumber
        }
  }).then(()=>{
      return models.MailTemplate.findOne({
        where: {
          templateNumber: templateNumber
        }
     });
   }).then((MailTemplate) => {
     if(MailTemplate == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(MailTemplate)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};


exports.create = (req,res) => {

  const templateNumber = req.body.tempInfo.templateNumber || '';
  const template = req.body.tempInfo.template || '';

  if(!templateNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "templateNumber" , req:templateNumber});
  }
  if(!template.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "template" , req:template});
  }


  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.MailTemplate.create({
    templateNumber: templateNumber,
    template: template,
    createUserId: "ADMIN",
    createDatetime: time
  }).then((MailTemplate) => res.status(201).json(MailTemplate))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.delete = (req,res) => {
  const templateNumber = req.params.templateNumber || '';

  if(!templateNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "templateNumber" , req:templateNumber});
  }
  return models.MailTemplate.destroy({
    where: {
      templateNumber: templateNumber,
    },
  
  },).then(() => {
    return res.status(200).json(systemMessage.delete.success);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};