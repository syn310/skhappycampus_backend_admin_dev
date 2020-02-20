const models = require('../../model/faq/Faq');
const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.index = (req,res) => {
    return models.Faq.findAll({
      where : { deleteYn : "N" },
      order: [['faqSeq', 'DESC']]
    })
    .then(faqs => res.json(faqs))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.show = (req,res) => {
  const faqSeq = req.params.faqSeq || '';

  if(!faqSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
  }

  models.Faq.findOne({
    where: {
      faqSeq: faqSeq
    }
  }).then(faq => {
      if (!faq){
        return res.status(404).json({error: systemMessage.search.targetMissing});
      }
      return res.json(faq);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err)
    });
};

// exports.destroy = (req, res) => {
//   const faqSeq = req.params.faqSeq || '';
//
//   if(!faqSeq.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
//   }
//
//   models.Faq.findOne({
//     where: {faqSeq: faqSeq}
//   }).then((faq)=>{
//     if(faq == null){
//       res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       models.Faq.destroy({
//         where: {faqSeq: faqSeq}
//       }).then(() => res.status(200).json(systemMessage.delete.success))
//       .catch(function (err) {
//             res.status(500).json(err)
//       });
//     }
//   })
// };
//
exports.create = (req,res) => {
  // console.log(req.body.faqInfo)
  const faqCategory = req.body.faqInfo.faqCategory || '';
  const faqQuestion = req.body.faqInfo.faqQuestion || '';
  const faqAnswer = req.body.faqInfo.faqAnswer || '';

  if(!faqCategory.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqCategory" , req:faqCategory});
  }

  if(!faqQuestion.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqQuestion" , req:faqQuestion});
  }

  if(!faqAnswer.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqAnswer" , req:faqAnswer});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Faq.findAll({
  })
  .then((faqs) => {
    const keyIndex = faqs.length + 1;

    models.Faq.create({
      faqSeq: keyIndex,
      faqCategory: faqCategory,
      faqQuestion: faqQuestion,
      faqAnswer: faqAnswer,
      createUserId: "ADMIN",
      createDatetime: time
    }).then((faq) => res.status(201).json(faq))
    .catch(function (err) {
        res.status(500).json(err)
    });


  })
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
  
};
//
exports.delete = (req,res) => {
  const faqSeq = req.params.faqSeq || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!faqSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Faq.update({
      deleteYn: "Y",
      updateDatetime: time,
      updateUserId: userId
  } , {
        where: {
          faqSeq: faqSeq
        }
  }).then(()=>{
      return models.Faq.findOne({
        where: {
          faqSeq: faqSeq
        }
     });
   }).then((faq) => {
     if(faq == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(faq)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};


exports.update = (req,res) => {
  const faqSeq = req.params.faqSeq || '';
  const faqCategory = req.body.faqInfo.faqCategory || '';
  const faqQuestion = req.body.faqInfo.faqQuestion || '';
  const faqAnswer = req.body.faqInfo.faqAnswer || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!faqSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqSeq" , req:faqSeq});
  }

  if(!faqCategory.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqCategory" , req:faqCategory});
  }

  if(!faqQuestion.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqQuestion" , req:faqQuestion});
  }

  if(!faqAnswer.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "faqAnswer" , req:faqAnswer});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Faq.update({
      faqCategory: faqCategory,
      faqQuestion: faqQuestion,
      faqAnswer: faqAnswer,
      updateDatetime: time,
      updateUserId: userId
  } , {
        where: {
          faqSeq: faqSeq
        }
  }).then(()=>{
      return models.Faq.findOne({
        where: {
          faqSeq: faqSeq
        }
     });
   }).then((faq) => {
     if(faq == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(faq)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
