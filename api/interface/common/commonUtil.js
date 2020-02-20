const jwt = require('jsonwebtoken');
const systemMessage = require('../../../config/systemMessage');
const crypto = require("crypto");
const request = require('request');
require('dotenv').config();

exports.getUserIdFromToken = (req,res) => {
  let token = req.headers['x-access-token'];
  let userId = "";
  if (!token || token == "null") {
    return userId;
  }else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
          return res.json({
              'err': err
            });
          }else{
            userId = decoded.userId;
          }
      });
    return userId;
  }
};

exports.getResultFromRest = (url, cb) => {

  var OPTIONS = {
      headers: {'Content-Type': 'application/json'},
      url: url,
      encoding:"utf-8",
      timeout: 3000,
  };

  let resultInfo = "";

  return request.get(OPTIONS, function (err, res, result) {
      if(err){
        cb(err, "");
      }else{
        resultInfo = result;
        cb(err, resultInfo);
      }
  });

  //나중에 지울것
  return res.status(200).json(resultInfo);
};

exports.transDateFormat = (targetDate) => {

  var searchStr = "-";
  var replaceStr = "";
  var resultDate = "";

  if(targetDate != "" && targetDate != null){
    resultDate = targetDate.replace(/-/gi,"");;
  }else{
    resultDate = "";
  }

  return resultDate;

};

exports.passwordEncrypt = (password) =>{
  return crypto.createHash("sha512").update(password + process.env.SHA_SALT).digest("base64");
};
