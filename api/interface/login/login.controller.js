const models = require('../../model/user/User');
const systemMessage = require('../../../config/systemMessage');
const util = require('../../../config/util');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const commonUtil = require('../common/commonUtil');

const redis = require("redis");
const client    = redis.createClient({
    port      : 6379,
    host      : process.env.redishost,
    password  : process.env.redispassword
    }
  );
client.select(8);

/** 관리자 로그인 */
exports.login = (req,res) => {
  const userId = req.body.userId || '';
  const userPassword = req.body.userPassword || '';

  if(!userId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userId" , req:userId});
  }

  if(!userPassword.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userPassword" , req:userPassword});
  }

  return models.User.findOne({
            where: {
                userId: req.body.userId,
                userPassword: commonUtil.passwordEncrypt(req.body.userPassword),
                userType: 'A'
            }
        })
        .then((user, err) => {
            if (err) {
              return res.json({
                'error': err
              });
            }
            else if (!user){ // user 값이 잘못된 값이면 바로 401 에러 뱉음
              return res.status(401).json({error:systemMessage.login.invalidInfo});
            } else {

              let payload = {
                  userId: user.userId,
                  userType: user.userType
              };
              let secretOrPrivateKey = process.env.JWT_SECRET;
              let options = {
                  expiresIn: 60 * 60 * Number(process.env.tokenEffectiveTime)
              };

              jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
                  if (err) return res.json({
                      'error': err
                  });

                  res.set("newtoken", token);
                  res.set("userid", payload.userId);
                  res.set("usertype", payload.userType);

                  // 토큰을 redis에 저장 (white list)
                  client.set(payload.userId, token);
                  res.json("login success");

              });
            }
        });
};

// refresh 토큰 발급
exports.refresh = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token || token == "null") {
      return res.status(999).json({error:systemMessage.token.tokenRequired});
    }else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              if(err.name == "TokenExpiredError") return res.status(998).json({error:systemMessage.token.tokenExpired});
              else if(err.name == "JsonWebTokenError") return res.status(401).json({error:systemMessage.token.tokenInvalidInfo});
            }
            else {
              req.decoded = decoded;
              return models.User.findOne({
                    where: {
                        userId: req.decoded.userId
                    }
              })
              .then((user, err) => {
                if (err) {
                    return res.json({
                      'error': err
                    });
                  } else {

                    // 토큰 유효성 체크 : 헤더에서 보낸 값과 레디스에 들어있는 토큰 값이 같아야만 Refresh Token 발급
                    client.get(req.decoded.userId, (err, reply) => {
                      if (err) return res.json({'error': err});
                       //  console.log("1. 헤더에서 가져온 토큰 값: "+ token);
                       //  console.log("2.레디스에 들어있는 토큰 값: "+ reply);
     
                      if(token != reply) {
                        // console.log("레디스에 들어있는 토큰 값: "+ reply);
                        // console.log("헤더에 전달된 토큰 값: "+ token);
                        return res.status(401).json({error:systemMessage.token.tokenDisagreement});
                      } else {
                        let payload = {
                            userId: user.userId,
                            userType: user.userType
                        };
                        let secretOrPrivateKey = process.env.JWT_SECRET;
                        let options = {
                            expiresIn: 60 * 60 * Number(process.env.tokenEffectiveTime)
                        };

                        return jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
                            if (err) {
                              return res.json({
                                'error': err
                              });
                            } else{

                              //console.log("3.레디스에 새롭게 저장하는 토큰 값: "+ token);
                              res.set("newtoken", token);
                              res.set("userid", payload.userId);
                              res.set("usertype", payload.userType);

                              client.set(payload.userId, token);
                              next();
                            }
                        });
                      }
                    });
                  }
              });
          }
      });
    }
};

// logout 시 토큰 삭제
exports.delete = (req,res) => {
  return models.User.findOne({
      where: {
          userId: req.body.userId
      }
  })
  .then((user, err) => {
      if (err) {
        return res.json({'error': err});
      } else {
        let payload = {
            userId: user.userId
        };
        client.del(payload.userId);
      }
    }).then(() => {
      return res.status(200).json("delete complete");
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};
