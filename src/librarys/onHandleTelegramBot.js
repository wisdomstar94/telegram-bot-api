const telegramBot = require('./getTelegramBot');
const telegramButtonCallback = require('../customs/telegramButtonCallback');
const Logger = require('./Logger');
const { v4 } = require('uuid');

telegramBot.on("callback_query", (callbackQuery) => {
  const logHeadTail = v4() + ' - ';
  Logger.info(logHeadTail + '==================================================================');
  Logger.info(logHeadTail + '▦▦▦▦▦▦▦ The telegram bot has detected a callback_query event. ▦▦▦▦▦▦▦');
  Logger.info(logHeadTail + 'callbackQuery : ' + JSON.stringify(callbackQuery));
  Logger.info(logHeadTail + 'buttonCallbackData : ' + callbackQuery.data);

  telegramButtonCallback(logHeadTail, callbackQuery);
});

module.exports = telegramBot;