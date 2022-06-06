const Logger = require('../librarys/Logger');

const errorHandler = function(err, req, res, next) {
  const err_status = err.status || 500;

  if (err_status !== 404) {
    Logger.error(req.logHeadTail + err.stack);
    Logger.error(req.logHeadTail + JSON.stringify(err));
  }

  if (err_status === 404) {
    Logger.error(req.logHeadTail + 'response : ' + 404);
    res.status(404).end();
    return;
  }

  Logger.error(req.logHeadTail + 'message : ' + err.message);
  Logger.error(req.logHeadTail + 'status : ' + err_status);

  res.status(err_status);
  try {
    if (typeof err.message === 'string') {
      Logger.error(req.logHeadTail + 'response : ' + err.message);
      res.status(err_status).send(err.message);
      return;  
    }

    const json_object = JSON.parse(err.message);
    Logger.error(req.logHeadTail + 'response : ' + JSON.stringify(json_object));
    res.status(err_status).json(json_object);
    return;
  } catch (e) {
    const body = 'An error has occurred. access head tail is ' + req.access_unique_key;
    Logger.error(req.logHeadTail + 'response : ' + body);
    res.send(body);
    return;
  }
};

module.exports = errorHandler;
