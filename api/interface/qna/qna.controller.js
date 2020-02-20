const models = require('../../model/qna/Qna');
const querySequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.index = (req,res) => {
    return models.Qna.findAll({
      where : { deleteYn : "N" },
      order: [['qnaCategory', 'DESC']]
    })
    .then(qnas => res.json(qnas))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.show = (req,res) => {
  const qnaSeq = req.params.qnaSeq || '';

  if(!qnaSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "qnaSeq" , req:qnaSeq});
  }

  models.Qna.findOne({
    where: {
      qnaSeq: qnaSeq
    }
  }).then(qna => {
      if (!qna){
        return res.status(404).json({error: systemMessage.search.targetMissing});
      }
      return res.json(qna);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err)
    });
};

exports.delete = (req,res) => {
  const qnaSeq = req.params.qnaSeq || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!qnaSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "qnaSeq" , req:qnaSeq});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Qna.update({
      deleteYn: "Y",
      updateDatetime: time,
      updateUserId: userId
  } , {
        where: {
          qnaSeq: qnaSeq
        }
  }).then(()=>{
      return models.Qna.findOne({
        where: {
          qnaSeq: qnaSeq
        }
     });
   }).then((qna) => {
     if(qna == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(qna)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};

exports.qnaAnswer = (req,res) => {
  const qnaSeq = req.params.qnaSeq || '';
  const qnaAnswer = req.body.qnaInfo.qnaAnswer || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!qnaSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "qnaSeq" , req:qnaSeq});
  }

  if(!qnaAnswer.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "qnaAnswer" , req:qnaAnswer});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Qna.update({
      qnaAnswer: qnaAnswer,
      answerYn: "Y",
      answerDatetime: time
  } , {
        where: {
          qnaSeq: qnaSeq
        }
  }).then(()=>{
      return models.Qna.findOne({
        where: {
          qnaSeq: qnaSeq
        }
     });
   }).then((qna) => {
     if(qna == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(qna)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};

exports.checkNewQna = (req,res) => {
  return models.Qna.findAll({
    where : { deleteYn : "N" , answerYn:"N"},
    order: [['qnaCategory', 'DESC']]
  })
  .then(qnas => {

    if (qnas.length < 1){
      return res.json("N")
    }

    return res.json("Y");
  })
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

