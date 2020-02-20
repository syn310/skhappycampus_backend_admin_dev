const models = require('../../model/user/User');
const systemMessage = require('../../../config/systemMessage');
const commonUtil = require('../common/commonUtil');
require('date-utils');

//일반 사용자 리스트 조회
exports.index = (req,res) => {
  return models.User.findAll({
    where : { userType : "A" },
    order: [['userId', 'ASC']]
  })
  .then(data => res.json(data))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};

exports.dupleCheck = (req,res) => {
  const userId = req.params.userId || '';

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  return models.User.findOne({
    where: {
      userId: userId
    }
  }).then(user => {
      if (!user){
        return res.status(200).json({row: '0'});
      }
      return res.status(200).json({row: '1'});
  }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};


exports.changePassword = (req,res) => {
  const applyUserId = commonUtil.getUserIdFromToken(req,res) || '';
  const password = req.body.password || '';
  const newPassword = req.body.newPassword || '';
  const newPasswordConfirm = req.body.newPasswordConfirm || '';
  const updateUserId = applyUserId;

  var validCheckUserId = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  var validCheckPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

  var newDate = new Date()
  var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  if(validCheckPassword.test(newPasswordConfirm) === false) {
    return res.status(200).json("올바른 비밀번호 형식이 아닙니다.");
  }

  if(newPassword != newPasswordConfirm) {
    return res.status(200).json("fail to change password : " + "newPassword is not same with newPasswordConfirm");
  }

  return models.User.findOne({
    where: {
      userId: applyUserId
    }
  }).then(user => {
      if (!user){
        return res.status(401).json("회원 정보가 없습니다.");
      }else if(user.userPassword != commonUtil.passwordEncrypt(password)){
        return res.status(200).json("fail to change password : " + "origin password is incorrect");
      }else if(user.userPassword == commonUtil.passwordEncrypt(newPassword)){
        return res.status(200).json("fail to change password : " + "userPassword is same with newPassword");
      }

      return models.User.update({
        userPassword: commonUtil.passwordEncrypt(newPassword),
        updateUserId: updateUserId,
        updateDatetime: time
      } , {
        where: {
          userId: applyUserId
        }
      }).then((user) => res.status(201).json(user))
      .catch(function (err) {
          console.log(err);
          return res.status(500).json(err);
      });
  }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
  });
};

exports.create = (req,res) => {
  const userId = req.body.userId || '';
  const userPassword = req.body.userPassword || '';
  const userPasswordConfirm = req.body.userPasswordConfirm || '';
  const createUserId = userId;
  const updateUserId = userId;

  var validCheckUserId = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  var validCheckPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

  if(validCheckUserId.test(userId) === false) {
    return res.status(400).json("이메일 형식이 아닙니다.");
  }

  if(validCheckPassword.test(userPassword) === false) {
    return res.status(400).json("올바른 비밀번호 형식이 아닙니다.");
  } 
  if(validCheckPassword.test(userPasswordConfirm) === false) {
    return res.status(400).json("올바른 비밀번호 형식이 아닙니다.");
  }
  if(userPassword !== userPasswordConfirm){
    return res.status(400).json("비밀번호가 일치하지 않습니다.");
  }

  return models.User.findOne({
    where: {
      userId: userId
    }
  }).then(user => {
      if (user){
        return res.status(409).json("아이디를 확인하세요.");
      }

      return models.User.create({
          userId: userId,
          userPassword: commonUtil.passwordEncrypt(userPassword),
          userType: "A", 
          createUserId: createUserId,
          updateUserId: updateUserId
      }).then((user) => res.status(201).json(user))
      .catch(function (err) {
          console.log(err);
          return res.status(500).json(err);
      });
  }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
  });
};

