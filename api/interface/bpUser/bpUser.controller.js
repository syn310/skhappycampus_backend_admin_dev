const models = require('../../model/bpUser/BpUser');
const companyModels = require('../../model/company/Company');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const transactionSequelize = require('../../model/models.js');
require('date-utils');

// 협력사 리스트 조회
exports.index = (req,res) => {
  return models.BpUser.findAll({
    order: [['userId', 'ASC']]
  })
  .then(data => res.json(data))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

exports.update = (req,res) => {
  const bpList = req.body.bpList || '';
  let result = [];
  // console.log(JSON.stringify(bpList));
  // const userId = commonUtil.getUserIdFromToken(req,res) || '';


  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
  transactionSequelize.transaction(function (t) {
    let promises = [];

    if(bpList.length > 0) {
      // 코드 Insert
      for(let i=0; i<bpList.length; i++){
        user = bpList[i];
        // console.log(JSON.stringify(user));
        const managerYn = user.managerYn ||'N';
        const aprvCompleteYn = user.aprvCompleteYn ||'';
        if(!managerYn.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "managerYn" , req:managerYn});
        }
        if(!aprvCompleteYn.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "aprvCompleteYn" , req:aprvCompleteYn});
        }
        let updatePromise = models.BpUser.update({
            managerYn: managerYn,
            aprvCompleteYn: aprvCompleteYn,
            updateDatetime: time,
            // updateUserId: userId,
          },{
            where: {
              userId: user.userId,
            }
          },{transaction: t});

        promises.push(updatePromise);
        result.push(updatePromise);
      }
    }else{
      return res.status(400).json({error:systemMessage.search.incorrectKey + "bpList" , req:bpList});
    }
    return Promise.all(promises);
  }).then(function (promises) {
    res.status(201).json({"result" : result});
    console.log("코드 update 성공");
  }).catch(function (err) {
    res.status(500).json(err)
    console.log(err);
    console.log("코드 입력실패");
  });
}


exports.destroy = (req, res) => {
  const userId = req.params.userId || '';

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  return models.BpUser.findOne({
    where: {
      userId: userId
    }
  }).then((user)=>{
    if(user == null){
      return res.status(404).json(systemMessage.search.targetMissing);
    }else{
      return models.BpUser.destroy({
        where: {
          userId: userId
        }
      }).then(() => res.status(200).json(systemMessage.delete.success))
      .catch(function (err) {
            return res.status(500).json(err);
      });
    }
  })
};
// exports.index = (req,res) => {
//   return models.BpUser.findAll({ logging: console.log },{
//     attributes: [['companyName'], 'companyId'],
//     include:[{
//       model: companyModels.Company,
//       required: false,
//       as: 'CompanyDefines'
//     }],
//     order: [['userId', 'ASC']]
//   })
//   .then(data => res.json(data))
//   .catch(function (err) {
//       console.log(err);
//       return res.status(500).json(err);
//   });
// };
// const Company = models.BpUser.belongsTo( companyModels.Company, { as: 'Company', foreignKey: 'companyId' })

// exports.index = (req,res) => {
//   // companyModels.Company.hasMany(models.BpUser, {foreignKey: 'company_id'})
//   // models.BpUser.belongsTo(companyModels.Company, {foreignKey: 'company_id'})
//   console.log(`index`)
//   return models.BpUser.findAll({ logging: console.log },{
//     include: [ Company ], 
//     // include: [{
//     //   model: companyModels.Company,
//     //   // required: true
//     //  }],
//     order: [['userId', 'ASC']]
//   })
//   .then(data => res.json(data))
//   .catch(function (err) {
//       console.log(err);
//       return res.status(500).json(err);
//   });
// };