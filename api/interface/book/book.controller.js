const models = require('../../model/book/Book');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
const commonUtil = require('../common/commonUtil');
require('date-utils');

// 모든  리스트 조회
exports.index = (req,res) => {
    return models.Book.findAll({
      order: [['bookId', 'ASC']]
    })
    .then(books => res.json(books))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
}

// 책 지급 완료 업데이트
exports.complete = (req,res) => {
  const bookId = req.params.bookId || '';

  console.log(bookId);
  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  return models.Book.update({
    completeYn: 'Y',
    updateDatetime: time,
    completeDatetime: time
  }, {
    where: {
      bookId: bookId
    }
  }).then(() => {
    return models.Book.findOne({
      where: {
        bookId: bookId
      }
    });
  }).then((book) => {
    if(!book){
      return res.status(404).json(systemMessage.delete.targetMissing);
    }else{
      return res.status(200).json(book);
    }
  }).catch(function(err) {
    console.log(err);
    return res.status(500).json(err);
  });
}
