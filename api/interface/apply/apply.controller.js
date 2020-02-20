const models = require('../../model/apply/Apply');
const authModels = require('../../model/niceAuth/NiceAuth');
const choiceModels = require('../../model/applyCompanyChoice/ApplyCompanyChoice');
const educationModels = require('../../model/applyEducation/ApplyEducation');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// exports.index = (req,res) => {
//   //추후 내가 쓴 문의사항만 보여주도록 변경 필요, 인증정보 나오면
//     return models.Apply.findAll()
//     .then(applys => {
//       return res.json(applys)
//     })
//     .catch(function (err) {
//         return res.status(500).json(err)
//     });
// };


//유저 정보 존재 유무 체크, (없으면 0, 있으면 1 return)
exports.userCheck = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.Apply.findOne({
    where: {
      serialNumber :serialNumber,
      applyUserId: applyUserId
    }
  }).then(apply => {
      if (!apply){
        return res.status(200).json({row: '0'});
      }
      return res.status(200).json({row: '1'});
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};

exports.show = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

    return models.Apply.findOne({
      where: {
        serialNumber :serialNumber,
        applyUserId: applyUserId
      }
    }).then(apply => {
      if (!apply){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(apply);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};


// exports.destroy = (req, res) => {
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
//   return models.Apply.findOne({
//     where: {
//       serialNumber :serialNumber,
//       applyUserId: applyUserId
//     }
//   }).then((apply)=>{
//     if(apply == null){
//       return res.status(404).json(systemMessage.search.targetMissing);
//     }else{
//       return models.Apply.destroy({
//         where: {
//           serialNumber :serialNumber,
//           applyUserId: applyUserId
//         }
//       }).then(() => {
//         return res.status(200).json(systemMessage.delete.success);
//       })
//       .catch(function (err) {
//             return res.status(500).json(err);
//       });
//     }
//   })
// };

exports.create = (req,res) => {
  const basicInfo = req.body.basicInfo;
  const serialNumber = basicInfo.serialNumber || '';
  const applyUserId = basicInfo.applyUserId || '';
  const applyName = basicInfo.applyName || '';
  const applyNationality = basicInfo.applyNationality || '';
  const applyBirth = commonUtil.transDateFormat(basicInfo.applyBirth) || '';
  const applyGender = basicInfo.applyGender || '';
  const applyPhone = commonUtil.transDateFormat(basicInfo.applyPhone) || '';
  const applyAddress = basicInfo.applyAddress || '';
  const disabilityYn = basicInfo.disabilityYn || '';
  const militaryYn = basicInfo.militaryYn || '';
  const veteransYn = basicInfo.veteransYn || '';
  const applyStatus = basicInfo.applyStatus || '';
  const coverLetter = basicInfo.coverLetter || '';
  const createUserId = basicInfo.createUserId || '';
  const updateUserId = basicInfo.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  return models.Apply.create({
    serialNumber :serialNumber,
    applyUserId: applyUserId,
    applyName: applyName,
    applyNationality: applyNationality,
    applyBirth: applyBirth,
    applyGender: applyGender,
    applyPhone: applyPhone,
    applyAddress: applyAddress,
    disabilityYn: disabilityYn,
    militaryYn: militaryYn,
    veteransYn: veteransYn,
    applyStatus: applyStatus,
    coverLetter: coverLetter,
    createUserId: createUserId,
    updateUserId: updateUserId
  }).then((apply) => {
    return res.status(201).json(apply)
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err)
  });
};

// exports.update = (req,res) => {
//   const serialNumber = req.params.serialNumber || '';
//   const applyUserId = req.params.applyUserId || '';
//
//   const basicInfo = req.body.basicInfo;
//   const applyName = basicInfo.applyName || '';
//   const applyNationality = basicInfo.applyNationality || '';
//   const applyBirth = basicInfo.applyBirth || '';
//   const applyGender = basicInfo.applyGender || '';
//   const applyPhone = basicInfo.applyPhone || '';
//   const applyAddress = basicInfo.applyAddress || '';
//   const disabilityYn = basicInfo.disabilityYn || '';
//   const militaryYn = basicInfo.militaryYn || '';
//   const veteransYn = basicInfo.veteransYn || '';
//   const applyStatus = basicInfo.applyStatus || '';
//   const coverLetter = basicInfo.coverLetter || '';
//   const createUserId = basicInfo.createUserId || '';
//   const updateUserId = basicInfo.updateUserId || '';
//
//   if(!serialNumber.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
//   }
//
//   if(!applyUserId.length){
//     return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
//   }
//
//   const newDate = new Date()
//   const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//
//   return models.Apply.update({
//     applyName: applyName,
//     applyNationality: applyNationality,
//     applyBirth: applyBirth,
//     applyGender: applyGender,
//     applyPhone: applyPhone,
//     applyAddress: applyAddress,
//     disabilityYn: disabilityYn,
//     militaryYn: militaryYn,
//     veteransYn: veteransYn,
//     applyStatus: applyStatus,
//     coverLetter: coverLetter,
//     createUserId: createUserId,
//     updateUserId: updateUserId,
//     updateDatetime: time
//   } , {
//     where: {
//       serialNumber: serialNumber,
//       applyUserId: applyUserId
//     }
//   }).then(()=>{
//       return models.Apply.findOne({
//         where: {
//           serialNumber: serialNumber,
//           applyUserId: applyUserId
//         }
//      });
//    }).then((apply) => {
//      if(apply == null) {
//        return res.status(404).json(systemMessage.search.targetMissing);
//      }else{
//        return res.status(200).json(apply);
//      }
//     })
//    .catch(function (err) {
//        return res.status(500).json(err);
//    });
// };

exports.resumeUpdate = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  const coverLetter = req.body.coverLetter;

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.Apply.update({
    coverLetter: coverLetter,
    updateDatetime: time
  } , {
    where: {
      serialNumber: serialNumber,
      applyUserId: applyUserId
    }
  }).then(()=>{
      return models.Apply.findOne({
        where: {
          serialNumber: serialNumber,
          applyUserId: applyUserId
        }
     });
   }).then((apply) => {
     if(apply == null) {
       return res.status(404).json(systemMessage.delete.targetMissing);
     }else{
       return res.status(200).json(apply);
     }
    })
   .catch(function (err) {
       console.log(err);
       return res.status(500).json(err);
   });
};

exports.statusUpdate = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
  const applyStatus = req.body.applyStatus || '';
  let errReturnCode = 401;
  let errReturnMsg = "잘못된 접근 입니다.";
  let successMsg = "상태업데이트가 완료되었습니다.";

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  const newDate = new Date();
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')

  var updateCondition = "";
  var result = "";
  if(applyStatus >= 3 && applyStatus < 7){
    updateCondition = authModels.NiceAuth.findOne({
      where: {
        serialNumber: serialNumber,
        applyUserId: applyUserId,
        dupYn: 'N'
      }
    }).then((niceAuth) => {
      let stepStatus = true;
      if(niceAuth == null) {
        stepStatus = false;
        errReturnCode = 997;
        errReturnMsg = "본인인증이 정상적으로 진행되지 않았습니다.";
      }
      return stepStatus;
    }).then((stepStatus) =>{
      if(stepStatus){
        models.Apply.findOne({
          where: {
            serialNumber: serialNumber,
            applyUserId: applyUserId
          }
        }).then((apply) => {
          let stepApplyStatus = true;
          if(apply == null) {
              stepApplyStatus = false;
          }
/*           else{
            let currentStatus = apply.applyStatus;
            let reqStatus = applyStatus;
            var stepDiff = reqStatus - currentStatus;
    
            if(stepDiff > 1){
              stepApplyStatus = false;
            
            }else if(Math.sign(stepDiff) == -1 || Math.sign(stepDiff) == 0){
              stepApplyStatus = false;
            }
          } */
    
          return stepApplyStatus;
        }).then((stepApplyStatus) =>{
          if(stepApplyStatus){
            return models.Apply.update({
              applyStatus: applyStatus,
              updateUserId: applyUserId,
              updateDatetime: time
            } , {
              where: {
                serialNumber: serialNumber,
                applyUserId: applyUserId
              }
            }).then(()=>{
              return models.Apply.findOne({
                where: {
                  serialNumber: serialNumber,
                  applyUserId: applyUserId
                }
             });
            }).then((apply) => {
              if(apply == null) {
                return res.status(404).json(systemMessage.search.targetMissing);
              }else{
                return res.status(200).json(successMsg);
              }
            }).catch(function (err) {
              console.log(err);
              return res.status(500).json(err);
            });
          }else{
            return res.status(errReturnCode).json(errReturnMsg);
          }
        });
      }else{
        return res.status(errReturnCode).json(errReturnMsg);
      }
    });
  }else if(applyStatus == 2){
    updateCondition = models.Apply.findOne({
          where: {
            serialNumber: serialNumber,
            applyUserId: applyUserId
          }
        }).then((apply) => {
          let stepApplyStatus = true;
          if(apply == null) {
            stepApplyStatus = false;
          }    
          return stepApplyStatus;
        }).then((stepApplyStatus) =>{
          if(stepApplyStatus){
            return models.Apply.update({
              applyStatus: applyStatus,
              updateUserId: applyUserId,
              updateDatetime: time,
              applyAgrTime: time
            } , {
              where: {
                serialNumber: serialNumber,
                applyUserId: applyUserId
              }
            }).then(()=>{
              return models.Apply.findOne({
                where: {
                  serialNumber: serialNumber,
                  applyUserId: applyUserId
                }
             });
            }).then((apply) => {
              if(apply == null) {
                return res.status(404).json(systemMessage.search.targetMissing);
              }else{
                return res.status(200).json(successMsg);
              }
            }).catch(function (err) {
              console.log(err);
              return res.status(500).json(err);
            });
          }else{
            return res.status(errReturnCode).json(errReturnMsg);
          }
        });
  }else if(applyStatus == 7){
    updateCondition = authModels.NiceAuth.findOne({
      where: {
        serialNumber: serialNumber,
        applyUserId: applyUserId,
        dupYn: 'N'
      }
    }).then((niceAuth) => {
      let stepStatus = true;
      if(niceAuth == null) {
        stepStatus = false;
        errReturnCode = 997;
        errReturnMsg = "본인인증이 정상적으로 진행되지 않았습니다.";
      }else{
        //인증체크까지는 되었고 이제 여기서 각 스텝별 null 체크
        var stepValiStatus = true;

        if(stepStatus){

          return models.Apply.findAndCountAll({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId,
              coverLetter: {[Op.ne]: ""},
              applyName: {[Op.ne]: ""},
              applyNationality: {[Op.ne]: ""},
              applyBirth: {[Op.ne]: ""},
              applyPhone: {[Op.ne]: ""},
              applyAddress: {[Op.ne]: ""},
              applyAgrTime: {[Op.ne]: null}

            }
          }).then((applyResult)=>{
            //console.log("applyListSize" + applyResult.count);
            if(applyResult.count < 1){
              stepValiStatus = false;

              errReturnCode = 200;
              errReturnMsg = "필수입력사항을 입력하지 않았습니다.";
            } 
            //회사 3개이상 체크
            return choiceModels.ApplyCompanyChoice.findAndCountAll({
              where: {
                serialNumber: serialNumber,
                applyUserId: applyUserId,
                firstCompany: {[Op.ne]: ""},
                secondCompany: {[Op.ne]: ""},
                thirdCompany: {[Op.ne]: ""}
              }
            }).then((choiceResult)=>{
              //console.log("choiceListSize = " + choiceResult.count);
              if(choiceResult.count < 1){
                stepValiStatus = false;
                errReturnCode = 200;
                errReturnMsg = "필수입력사항을 입력하지 않았습니다.";
              } 
              //고등학교 학력정보 입력 체크
              return educationModels.ApplyEducation.findAndCountAll({
                where: {
                  serialNumber: serialNumber,
                  applyUserId: applyUserId,
                  educationSeq: {[Op.ne]: ""},
                  degree: {[Op.ne]: ""},
                  graduStatus: {[Op.ne]: ""},
                  enterDateInfo: {[Op.ne]: ""},
                  graduDateInfo: {[Op.ne]: ""},
                  schoolName: {[Op.ne]: ""}
                }
              }).then((eduResult)=>{
                //console.log("educationListSize = " + eduResult.count);
                var totalCount = "";
                var eduValiCount = eduResult.count;

                return educationModels.ApplyEducation.count({
                  where: {
                    serialNumber: serialNumber,
                    applyUserId: applyUserId
                  }
                }).then((totalNum)=>{
                  totalCount = totalNum;

                  if(eduValiCount < totalCount){
                    stepValiStatus = false;
                    errReturnCode = 200;
                    errReturnMsg = "필수입력사항을 입력하지 않았습니다.";
                  }

                  return stepValiStatus;

                });       
              })
            })
          })
        }
      }
      return stepStatus;
    }).then((stepStatus) =>{
      if(stepStatus){
        return models.Apply.update({
          applyStatus: applyStatus,
          updateUserId: applyUserId,
          updateDatetime: time
        } , {
          where: {
            serialNumber: serialNumber,
            applyUserId: applyUserId
          }
        }).then(()=>{
          return models.Apply.findOne({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            }
          });
        }).then((apply) => {
          if(apply == null) {
            return res.status(404).json(systemMessage.search.targetMissing);
          }else{
            return res.status(200).json(successMsg);
          }
        }).catch(function (err) {
          console.log(err);
          return res.status(500).json(err);
        });
      }else{
        return res.status(errReturnCode).json(errReturnMsg);
      }
    });
  }else if(applyStatus == 1){
    updateCondition = models.Apply.findOne({
      where: {
        serialNumber: serialNumber,
        applyUserId: applyUserId
      }
    }).then((apply) => {
      let stepStatus = true;
      if(apply == null) {
        return res.status(400).json(systemMessage.search.targetMissing);
      }
/*       else{
        let currentStatus = apply.applyStatus;
        let reqStatus = applyStatus;
        let stepDiff = reqStatus - currentStatus;

        if(stepDiff > 1){
          stepStatus = false;
        }else if(Math.sign(stepDiff) == -1 || Math.sign(stepDiff) == 0){
          stepStatus = false;
        }
      } */

      return stepStatus;
    }).then((stepStatus) =>{
      if(stepStatus){
        return models.Apply.update({
          applyStatus: applyStatus,
          updateUserId: applyUserId,
          updateDatetime: time
          } , {
          where: {
            serialNumber: serialNumber,
            applyUserId: applyUserId
          }
        }).then(()=>{
          return models.Apply.findOne({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            }
         });
        }).then((apply) => {
          if(apply == null) {
            return res.status(404).json(systemMessage.search.targetMissing);
          }else{
            return res.status(200).json(successMsg);
          }
        }).catch(function (err) {
          console.log(err);
          return res.status(500).json(err);
        });
      }else{
        return res.status(errReturnCode).json(errReturnMsg);
      }
    });
  }
  
  if(applyStatus > 7){
    return res.status(errReturnCode).json(errReturnMsg);
  }else{
    return updateCondition;
  }
  
};


exports.show = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = req.params.applyUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

    return models.Apply.findOne({
      where: {
        serialNumber :serialNumber,
        applyUserId: applyUserId
      }
    }).then(apply => {
      if (!apply){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(apply);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err)
    });
};
