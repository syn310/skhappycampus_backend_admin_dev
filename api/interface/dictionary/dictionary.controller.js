const models = require('../../model/dictionary/Dictionary');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
require('date-utils');

// exports.index = (req,res) => {
//     return models.Dictionary.findAll()
//     .then(dictionaries => {
//       return res.json(dictionaries)
//     })
//     .catch(function (err) {
//         return res.status(500).json(err)
//     });
// };
