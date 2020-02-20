const applyEduModel = require('../../model/applyEducation/ApplyEducation');
const applyCertModel = require('../../model/applyCertificate/ApplyCertificate');
const applyModel = require('../../model/apply/Apply');
const transactionSequelize = require('../../model/models.js');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');

exports.create = (req,res) => {

  const applyInfo = req.body.basicInfo;
  const serialNumber = applyInfo.serialNumber || '';
  const applyUserId = applyInfo.applyUserId || '';
  const applyName = applyInfo.applyName || '';
  const applyNationality = applyInfo.applyNationality || '';
  const applyBirth = commonUtil.transDateFormat(applyInfo.applyBirth) || '';
  const applyGender = applyInfo.applyGender || '';
  const applyPhone = commonUtil.transDateFormat(applyInfo.applyPhone) || '';
  const applyAddress = applyInfo.applyAddress || '';
  const disabilityYn = applyInfo.disabilityYn || '';
  const militaryYn = applyInfo.militaryYn || '';
  const veteransYn = applyInfo.veteransYn || '';
  const applyStatus = applyInfo.applyStatus || '';
  const coverLetter = applyInfo.coverLetter || '';
  const createUserId = applyInfo.createUserId || '';
  const updateUserId = applyInfo.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  var applyResult = {};
  var eduResult = [];
  var certResult = [];

  transactionSequelize.transaction(function (t) {
    let promises = [];

    //학력사항 삭제
    let eduDelete = applyEduModel.ApplyEducation.destroy({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            },
            transaction: t
    });
    promises.push(eduDelete);

    //자격증 정보 삭제
    let certDelete = applyCertModel.ApplyCertificate.destroy({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            },
            transaction: t
    });
    promises.push(certDelete);

    //기본사항 추가
    let applyPromise = applyModel.Apply.create({
            serialNumber: serialNumber,
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
          }, {transaction: t});
    promises.push(applyPromise);
    applyResult = applyPromise;

    const degreeInfoArr = req.body.degreeInfoArr;
    if(degreeInfoArr.length > 0){
      //교육이력 추가
      for(let i=0; i<degreeInfoArr.length; i++){
        degreeInfo = degreeInfoArr[i];
        const serialNumber = degreeInfo.serialNumber || '';
        const applyUserId = degreeInfo.applyUserId || '';
        const educationSeq = degreeInfo.educationSeq || '';
        const degree = degreeInfo.degree || '';
        const graduStatus = degreeInfo.graduStatus || '';
        const enterDateInfo = commonUtil.transDateFormat(degreeInfo.enterDateInfo) || '';
        const graduDateInfo = commonUtil.transDateFormat(degreeInfo.graduDateInfo) || '';
        const schoolName = degreeInfo.schoolName || '';
        const mainCampusYn = degreeInfo.mainCampusYn || '';
        const major = degreeInfo.major || '';
        const minor = degreeInfo.minor || '';
        const doubleMajor = degreeInfo.doubleMajor || '';
        const grade = degreeInfo.grade || '';
        const perfectGrade = degreeInfo.perfectGrade || '';
        const transferYn = degreeInfo.transferYn || '';
        const createUserId = degreeInfo.createUserId || '';
        const updateUserId = degreeInfo.updateUserId || '';

        if(!serialNumber.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" +i , req:serialNumber});
        }

        if(!applyUserId.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" +i, req:applyUserId});
        }

        if(!educationSeq.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "educationSeq" +i, req:educationSeq});
        }

        let eduPromise = applyEduModel.ApplyEducation.create({
              serialNumber: serialNumber,
              applyUserId: applyUserId,
              educationSeq: educationSeq,
              degree: degree,
              graduStatus: graduStatus,
              enterDateInfo: enterDateInfo,
              graduDateInfo: graduDateInfo,
              schoolName: schoolName,
              mainCampusYn: mainCampusYn,
              major: major,
              minor: minor,
              doubleMajor: doubleMajor,
              grade: grade,
              perfectGrade: perfectGrade,
              transferYn: transferYn,
              createUserId: createUserId,
              updateUserId: updateUserId
            },{transaction: t});

        promises.push(eduPromise);
        eduResult.push(eduPromise);
    }
  }

  const extraCertArr = req.body.extraCertArr;
  if(extraCertArr.length > 0){
    //자격증 정보 추가
    for(var i=0; i<extraCertArr.length; i++){
      extraCertInfo = extraCertArr[i];
      const serialNumber = extraCertInfo.serialNumber || '';
      const applyUserId = extraCertInfo.applyUserId || '';
      const certificateSeq = extraCertInfo.certificateSeq || '';
      const certificateContent = extraCertInfo.certificateContent || '';
      const certificateDate = commonUtil.transDateFormat(extraCertInfo.certificateDate) || '';
      const certificateGrade = extraCertInfo.certificateGrade || '';
      const certificateOrganization = extraCertInfo.certificateOrganization || '';
      const createUserId = extraCertInfo.createUserId || '';
      const updateUserId = extraCertInfo.updateUserId || '';

      if(!serialNumber.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" +i , req:serialNumber});
      }

      if(!applyUserId.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" +i, req:applyUserId});
      }

      if(!certificateSeq.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "certificateSeq" +i, req:certificateSeq});
      }

      var certPromise = applyCertModel.ApplyCertificate.create({
            serialNumber: serialNumber,
            applyUserId: applyUserId,
            certificateSeq: certificateSeq,
            certificateContent: certificateContent,
            certificateDate: certificateDate,
            certificateGrade: certificateGrade,
            certificateOrganization: certificateOrganization,
            createUserId: createUserId,
            updateUserId: updateUserId
          },{transaction: t});

      promises.push(certPromise);
      certResult.push(certPromise);
  }
  }

  return Promise.all(promises);

  }).then(function (promises) {
    let resultData = {
      "basicInfo" : applyResult,
      "degreeInfoArr" : eduResult,
      "extraCertArr" : certResult
    };

    res.status(201).json(resultData);
    console.log("개인정보 입력성공");
  }).catch(function (err) {
    res.status(500).json(err)
    console.log(err);
    console.log("개인정보 입력실패");
  });
};


exports.update = (req,res) => {
  const serialNumber = req.params.serialNumber || '';
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';

  const applyInfo = req.body.basicInfo;
  const applyName = applyInfo.applyName || '';
  const applyNationality = applyInfo.applyNationality || '';
  const applyBirth = commonUtil.transDateFormat(applyInfo.applyBirth) || '';
  const applyGender = applyInfo.applyGender || '';
  const applyPhone = commonUtil.transDateFormat(applyInfo.applyPhone) || '';
  const applyAddress = applyInfo.applyAddress || '';
  const disabilityYn = applyInfo.disabilityYn || '';
  const militaryYn = applyInfo.militaryYn || '';
  const veteransYn = applyInfo.veteransYn || '';
  const applyStatus = applyInfo.applyStatus || '';
  const coverLetter = applyInfo.coverLetter || '';
  const createUserId = applyInfo.createUserId || '';
  const updateUserId = applyInfo.updateUserId || '';

  if(!serialNumber.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" , req:serialNumber});
  }

  if(!applyUserId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" , req:applyUserId});
  }

  var applyResult = {};
  var eduResult = [];
  var certResult = [];

  transactionSequelize.transaction(function (t) {
    let promises = [];

    //학력사항 삭제
    let eduDelete = applyEduModel.ApplyEducation.destroy({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            },
            transaction: t
    });
    promises.push(eduDelete);

    //자격증 정보 삭제
    let certDelete = applyCertModel.ApplyCertificate.destroy({
            where: {
              serialNumber: serialNumber,
              applyUserId: applyUserId
            },
            transaction: t
    });
    promises.push(certDelete);

    const newDate = new Date()
    const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')

    //기본사항 추가
    let applyPromise = applyModel.Apply.update({
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
            updateUserId: updateUserId,
            updateDatetime: time
    }, {
      where: {serialNumber:serialNumber, applyUserId: applyUserId},
      transaction: t
    });

    let applyPromiseForResult = {
            serialNumber: serialNumber,
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
            updateUserId: updateUserId,
            updateDatetime: time
    };


    promises.push(applyPromise);
    applyResult = applyPromiseForResult;

    const degreeInfoArr = req.body.degreeInfoArr;
    if(degreeInfoArr.length > 0){
      //교육이력 추가
      for(let i=0; i<degreeInfoArr.length; i++){
        degreeInfo = degreeInfoArr[i];
        const serialNumber = degreeInfo.serialNumber || '';
        const applyUserId = degreeInfo.applyUserId || '';
        const educationSeq = degreeInfo.educationSeq || '';
        const degree = degreeInfo.degree || '';
        const graduStatus = degreeInfo.graduStatus || '';
        const enterDateInfo = commonUtil.transDateFormat(degreeInfo.enterDateInfo) || '';
        const graduDateInfo = commonUtil.transDateFormat(degreeInfo.graduDateInfo) || '';
        const schoolName = degreeInfo.schoolName || '';
        const mainCampusYn = degreeInfo["mainCampusYn"+degreeInfo.educationSeq] || '';
        const major = degreeInfo.major || '';
        const minor = degreeInfo.minor || '';
        const doubleMajor = degreeInfo.doubleMajor || '';
        const grade = degreeInfo.grade || '';
        const perfectGrade = degreeInfo.perfectGrade || '';
        const transferYn = degreeInfo["transferYn"+degreeInfo.educationSeq] || '';
        const createUserId = degreeInfo.createUserId || '';
        const updateUserId = degreeInfo.updateUserId || '';

        if(!serialNumber.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" +i , req:serialNumber});
        }

        if(!applyUserId.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" +i, req:applyUserId});
        }

        if(!educationSeq.length){
          return res.status(400).json({error:systemMessage.search.incorrectKey + "educationSeq" +i, req:educationSeq});
        }

        let eduPromise = applyEduModel.ApplyEducation.create({
              serialNumber: serialNumber,
              applyUserId: applyUserId,
              educationSeq: educationSeq,
              degree: degree,
              graduStatus: graduStatus,
              enterDateInfo: enterDateInfo,
              graduDateInfo: graduDateInfo,
              schoolName: schoolName,
              mainCampusYn: mainCampusYn,
              major: major,
              minor: minor,
              doubleMajor: doubleMajor,
              grade: grade,
              perfectGrade: perfectGrade,
              transferYn: transferYn,
              createUserId: createUserId,
              updateUserId: updateUserId
            },{transaction: t});

        let eduPromiseForResult = {
              serialNumber: serialNumber,
              applyUserId: applyUserId,
              educationSeq: educationSeq,
              degree: degree,
              graduStatus: graduStatus,
              enterDateInfo: enterDateInfo,
              graduDateInfo: graduDateInfo,
              schoolName: schoolName,
              mainCampusYn: mainCampusYn,
              major: major,
              minor: minor,
              doubleMajor: doubleMajor,
              grade: grade,
              perfectGrade: perfectGrade,
              createUserId: createUserId,
              updateUserId: updateUserId
        };

        eduPromiseForResult["transferYn"+educationSeq] = transferYn;
        eduPromiseForResult["mainCampusYn"+educationSeq] = mainCampusYn;

        promises.push(eduPromise);
        eduResult.push(eduPromiseForResult);
    }
  }

  const extraCertArr = req.body.extraCertArr;
  if(extraCertArr.length > 0){
    //자격증 정보 추가
    for(var i=0; i<extraCertArr.length; i++){
      extraCertInfo = extraCertArr[i];
      const serialNumber = extraCertInfo.serialNumber || '';
      const applyUserId = extraCertInfo.applyUserId || '';
      const certificateSeq = extraCertInfo.certificateSeq || '';
      const certificateContent = extraCertInfo.certificateContent || '';
      const certificateDate = commonUtil.transDateFormat(extraCertInfo.certificateDate) || '';
      const certificateGrade = extraCertInfo.certificateGrade || '';
      const certificateOrganization = extraCertInfo.certificateOrganization || '';
      const createUserId = extraCertInfo.createUserId || '';
      const updateUserId = extraCertInfo.updateUserId || '';

      if(!serialNumber.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "serialNumber" +i , req:serialNumber});
      }

      if(!applyUserId.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "applyUserId" +i, req:applyUserId});
      }

      if(!certificateSeq.length){
        return res.status(400).json({error:systemMessage.search.incorrectKey + "certificateSeq" +i, req:certificateSeq});
      }

      var certPromise = applyCertModel.ApplyCertificate.create({
            serialNumber: serialNumber,
            applyUserId: applyUserId,
            certificateSeq: certificateSeq,
            certificateContent: certificateContent,
            certificateDate: certificateDate,
            certificateGrade: certificateGrade,
            certificateOrganization: certificateOrganization,
            createUserId: createUserId,
            updateUserId: updateUserId
      },{transaction: t});

      var certPromiseForResult = {
            serialNumber: serialNumber,
            applyUserId: applyUserId,
            certificateSeq: certificateSeq,
            certificateContent: certificateContent,
            certificateDate: certificateDate,
            certificateGrade: certificateGrade,
            certificateOrganization: certificateOrganization,
            createUserId: createUserId,
            updateUserId: updateUserId
      };

      promises.push(certPromise);
      certResult.push(certPromiseForResult);
  }
  }

  return Promise.all(promises);

  }).then(function (promises) {
    let resultData = {
      "basicInfo" : applyResult,
      "degreeInfoArr" : eduResult,
      "extraCertArr" : certResult
    };

    res.status(201).json(resultData);
    console.log("개인정보 수정성공");
  }).catch(function (err) {
    res.status(500).json(err)
    console.log(err);
    console.log("개인정보 수정실패");
  });
};
