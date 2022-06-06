require('dotenv').config();
const telegramBot = require('../../../librarys/getTelegramBot');
const Logger = require('../../../librarys/Logger');

const botMessageSend = function(req, res, next) {
  let return_message = '';

  const message = req.body.message;
  if (typeof message !== 'string') {
    return_message = 'There are no messages.';
    Logger.error(req.logHeadTail + 'response : ' + return_message);
    res.send(return_message);
    return;
  }

  telegramBot.sendMessage(process.env.TELEGRAM_CHANNEL_ID, message).then((value) => {
    Logger.info(req.logHeadTail + 'telegram channel message send success!');  
  }).catch((error) => {
    Logger.error(req.logHeadTail + 'error : ' + JSON.stringify(error));
    Logger.error(req.logHeadTail + 'telegram channel message send failure!');
  });
  
  return_message = 'Completed an attempt to send a message to a specific bot on a Telegram channel.';
  Logger.info(req.logHeadTail + 'response : ' + return_message);
  res.send(return_message);
  return;
};

module.exports = botMessageSend;
