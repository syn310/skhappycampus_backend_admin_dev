const models = require('../../model/commonCode/CommonCode');
const systemMessage = require('../../../config/systemMessage');
const Sequelize = require('sequelize')
const transactionSequelize = require('../../model/models.js');
const commonUtil = require('../common/commonUtil');

exports.groupCodeList = (req,res) => {
  return models.CommonCode.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('group_name')) ,'groupName'],
    ],
    order: [['groupName', 'ASC']]
  }).then(commonCodes => {
    return res.json(commonCodes)
  })
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
}


exports.show = (req,res) => {
  const groupName = req.params.groupName || '';

    return models.CommonCode.findAll({
      where: {
        groupName: groupName
      }  ,order: [['codeOrder', 'ASC']]
    }).then(commonCodes => {
      return res.json(commonCodes)
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};


exports.index = (req,res) => {
  const groupName = req.params.groupName || '';
  const codeOption = req.params.codeOption || '';

    return models.CommonCode.findAll({
      where: {
        groupName: groupName
      }  ,order: [['codeOrder', 'ASC']]
    }).then(commonCodes => {
      let codeList = [];

      if(codeOption == 'S'){
        code = {value:"",text:"선택", key:""}
        codeList.push(code);
      }else if(codeOption == 'A'){
        code = {value:"",text:"전체", key:""}
        codeList.push(code);
      }

      for(var i=0; i<commonCodes.length; i++){
        code = {
          value:commonCodes[i].codeValue,
          text:commonCodes[i].codeName,
          key:commonCodes[i].codeName,
        }
        codeList.push(code);
      }

      return res.json(codeList)
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};


exports.groupUpdate = (req,res) => {
  const originGroupName = req.body.originGroupName || '';
  const groupName = req.body.groupName || '';
  const userId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!originGroupName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "originGroupName" , req:originGroupName});
  }

  if(!groupName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "groupName" , req:groupName});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.CommonCode.update({
    groupName :groupName,
    updateDatetime: time,
    updateUserId: userId,
  }, {
    where: {
      groupName: originGroupName,
    }
  },).then((code) => {
    return res.status(201).json(code)
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};



exports.codeUpdate = (req,res) => {
  const codeList = req.body.codeList || '';
  const groupName = req.body.groupName || '';
  let codeResult = [];
  const userId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!groupName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "groupName" , req:groupName});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  transactionSequelize.transaction(function (t) {
    let promises = [];
    //해당 그룹코드에 속한 항목 삭제
    let codeDelete = models.CommonCode.destroy({
            where: {
              groupName: groupName,
            },
            transaction: t
    });
    promises.push(codeDelete);

    if(codeList.length > 0) {
      // 코드 Insert
      for(let i=0; i<codeList.length; i++){
        codeInfo = codeList[i];
        if(!codeInfo.codeName.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "codeName" , req:codeInfo.codeName});
        }
        if(!codeInfo.codeValue.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "codeValue" , req:codeInfo.codeValue});
        }
        if(codeInfo.codeOrder === ''){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "codeOrder" , req:codeInfo.codeOrder});
        }
        let insertPromise = models.CommonCode.create({
            groupName: groupName,
            codeName: codeInfo.codeName,
            codeValue: codeInfo.codeValue,
            codeOrder: codeInfo.codeOrder,
            createDatetime: time,
            createUserId: userId,
            updateDatetime: time,
            updateUserId: userId,
          },{transaction: t});

        promises.push(insertPromise);
        codeResult.push(insertPromise);
      }
    }
    return Promise.all(promises);
  }).then(function (promises) {
    res.status(201).json({"codeResult" : codeResult});
    console.log("코드 입력성공");
  }).catch(function (err) {
    res.status(500).json(err)
    console.log(err);
    console.log("코드 입력실패");
  });
};


exports.create = (req,res) => {
  const groupName = req.body.groupName || '';
  const codeName = req.body.codeName || '';
  const codeValue = req.body.codeValue || '';
  const codeOrder = req.body.codeOrder || 0;
  const userId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!groupName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "groupName" , req:groupName});
  }
  if(!codeName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "codeName" , req:codeName});
  }
  if(!codeValue.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "codeValue" , req:codeValue});
  }
  if(codeOrder === ""){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "codeOrder" , req:codeOrder});
  }
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.CommonCode.create({
    groupName : groupName.toUpperCase(),
    codeName: codeName.toUpperCase(),
    codeValue: codeValue.toUpperCase(),
    codeOrder: codeOrder,
    createDatetime: time,
    createUserId: userId,
    updateDatetime: time,
    updateUserId: userId,
  
  },).then((code) => {
    return res.status(201).json(code)
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};


exports.delete = (req,res) => {
  const groupName = req.params.groupName || '';

  if(!groupName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "groupName" , req:groupName});
  }
  return models.CommonCode.destroy({
    where: {
      groupName: groupName,
    },
  
  },).then(() => {
    return res.status(200).json(systemMessage.delete.success);
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};

