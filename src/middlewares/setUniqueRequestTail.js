const { v4 } = require('uuid');

const setUniqueRequestTail = function(req, res, next) {
  req.access_unique_key = v4();
  req.logHeadTail = req.access_unique_key + ' - ';
  next();
};

module.exports = setUniqueRequestTail;
