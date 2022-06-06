require('dotenv').config();
const telegramBot = require('../../../librarys/getTelegramBot');
const Logger = require('../../../librarys/Logger');
const telegramButtonList = require('../../../customs/telegramButtonList');

const botMessageSend = function(req, res, next) {
  let return_message = '';

  const {
    message,
    isButtonShow,
  } = req.body;

  if (typeof message !== 'string') {
    return_message = 'There are no messages.';
    Logger.error(req.logHeadTail + 'response : ' + return_message);
    res.send(return_message);
    return;
  }

  let options;
  if (isButtonShow === true) {
    options = {
      reply_markup: {
        inline_keyboard: Array.isArray(telegramButtonList) ? telegramButtonList : [],
      },
    };
  }

  telegramBot.sendMessage(process.env.TELEGRAM_CHANNEL_ID, message, options).then((value) => {
    Logger.info(req.logHeadTail + 'telegram channel message send success!');  
  }).catch((error) => {
    Logger.error(req.logHeadTail + 'error.stack : ' + error.stack);
    Logger.error(req.logHeadTail + 'telegram channel message send failure!');
  });
  
  return_message = 'Completed an attempt to send a message to a specific bot on a Telegram channel.';
  Logger.info(req.logHeadTail + 'response : ' + return_message);
  res.send(return_message);
  return;
};

module.exports = botMessageSend;
