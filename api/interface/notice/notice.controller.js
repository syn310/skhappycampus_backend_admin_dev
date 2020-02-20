const models = require('../../model/notice/Notice');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
require('date-utils');

//공지사항 리스트 조회
exports.index = (req,res) => {
    return models.Notice.findAll({
      order: [['noticeTitle', 'DESC']]
    })
    .then(notices => res.json(notices))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

//공지사항 리스트 조회(with Paging)
exports.paging = (req,res) => {
  /** parameter */
  const pageNum = +req.params.pageNum || 1; //요청한 Page Number
  const countPerPage = +req.params.countPerPage || 0; //한 페이지에 나오는 리스트 갯수

  let totalItems; // 전체 갯수
  let startNum;
  models.Notice.count().then( count =>{
    totalItems = count;
    startNum = countPerPage*(pageNum-1);
    return  models.Notice.findAndCountAll({
        offset: startNum, 
        limit: countPerPage,
        order: [['noticeSeq', 'ASC']]
    });
  }).then(notices  => {
    const result = {
      count: notices.count,
      rows  : notices.rows,
      totalPages : Math.ceil(totalItems/countPerPage)
    }
    res.json(result)})
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

//공지사항 상세조회
exports.show = (req,res) => {
  const noticeSeq = req.params.noticeSeq || '';

  if(!noticeSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeSeq" , req:noticeSeq});
  }

  models.Notice.findOne({
    where: {
      noticeSeq: noticeSeq
    }
  }).then(notice => {
      if (!notice){
        return res.status(404).json({error: systemMessage.search.targetMissing});
      }
      return res.json(notice);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err)
    });
};

exports.destroy = (req, res) => {
  const noticeSeq = req.params.noticeSeq || '';

  if(!noticeSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeSeq" , req:noticeSeq});
  }

  models.Notice.findOne({
    where: {noticeSeq: noticeSeq}
  }).then((notice)=>{
    if(notice == null){
      res.status(404).json(systemMessage.search.targetMissing);
    }else{
      models.Notice.destroy({
        where: {noticeSeq: noticeSeq}
      }).then(() => res.status(200).json(systemMessage.delete.success))
      .catch(function (err) {
            res.status(500).json(err)
      });
    }
  })
};

exports.create = (req,res) => {
  const noticeCategory = req.body.noticeCategory || '';
  const noticeTitle = req.body.noticeTitle || '';
  const noticeContent = req.body.noticeContent || '';
  const applicantYn = req.body.applicantYn || '';
  const bpYn = req.body.bpYn || '';
  const userId = commonUtil.getUserIdFromToken(req,res) || ''; 

  if(!noticeCategory.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeCategory" , req:noticeCategory});
  }
  if(!noticeTitle.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeTitle" , req:noticeTitle});
  }
  if(!noticeContent.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeContent" , req:noticeContent});
  }
  if(!applicantYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applicantYn" , req:applicantYn});
  }
  if(!bpYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "bpYn" , req:bpYn});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Notice.create({
      noticeCategory: noticeCategory,
      noticeTitle: noticeTitle,
      noticeContent: noticeContent,
      applicantYn: applicantYn,
      bpYn: bpYn,
      deleteYn: 'N',
      createUserId: userId,
      createDatetime: time
  }).then((notice) => res.status(201).json(notice))
  .catch(function (err) {
      res.status(500).json(err)
  });
};

exports.update = (req,res) => {
  const noticeSeq = req.params.noticeSeq || '';
  const noticeCategory = req.body.noticeCategory || '';
  const noticeTitle = req.body.noticeTitle || '';
  const noticeContent = req.body.noticeContent || '';
  const applicantYn = req.body.applicantYn || '';
  const bpYn = req.body.bpYn || '';
  const userId = commonUtil.getUserIdFromToken(req,res) || ''; 

  if(!noticeSeq.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeSeq" , req:noticeSeq});
  }
  if(!noticeCategory.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeCategory" , req:noticeCategory});
  }
  if(!noticeTitle.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeTitle" , req:noticeTitle});
  }
  if(!noticeContent.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "noticeContent" , req:noticeContent});
  }
  if(!applicantYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applicantYn" , req:applicantYn});
  }
  if(!bpYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "bpYn" , req:bpYn});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.Notice.update({
      noticeCategory: noticeCategory,
      noticeTitle: noticeTitle,
      noticeContent: noticeContent,
      applicantYn: applicantYn,
      bpYn: bpYn,
      updateUserId: userId,
      updateDatetime: time
  } , {
        where: {
          noticeSeq: noticeSeq
        }
  }).then(()=>{
      return models.Notice.findOne({
        where: {
          noticeSeq: noticeSeq
        }
     });
   }).then((notice) => {
     if(notice == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(notice)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};
