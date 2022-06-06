require('dotenv').config();
const path = require('path');
const geoip = require('geoip-lite');
const requestIP = require('request-ip');
const Logger = require('../librarys/Logger');

const setLogging = function(req, res, next) {
  const clientIP = requestIP.getClientIp(req);
  const notLoggingFileType = process.env.NOT_LOGGING_FILE_TYPE.split(',');
  const pathParseInfo = path.parse(req.url);

  req.real_ip = clientIP;
  req.full_path = req.path;

  if (!notLoggingFileType.includes(pathParseInfo.ext)) {
    Logger.info(req.logHeadTail + '==================================================================');
    Logger.info(req.logHeadTail + '▦▦▦▦▦▦▦  ' + req.method + ' ' + req.url + '  ▦▦▦▦▦▦▦');
    Logger.info(req.logHeadTail + 'req ip address : ' + clientIP);
    Logger.info(req.logHeadTail + 'req ip info : ' + JSON.stringify(geoip.lookup(clientIP)));
    Logger.info(req.logHeadTail + 'req header : ' + JSON.stringify(req.headers));
    Logger.info(req.logHeadTail + 'req body : ' + JSON.stringify(req.body));
    Logger.info(req.logHeadTail + 'req query : ' + JSON.stringify(req.query));
    Logger.info(req.logHeadTail + 'req hostname' + req.hostname);
  }

  req.is_test_server = false;
  if (req.hostname === 'localhost') {
    req.is_test_server = true;
  }

  next();
};

module.exports = setLogging;
