const axios = require('axios');
const telegramBot = require('../librarys/getTelegramBot');
const Logger = require('../librarys/Logger');

const telegramButtonCallback = async(logHeadTail, callbackQuery) => {
  const callback_data = callbackQuery.data;

  /*
    "callbackQuery example data structure"

    {
      id: '0123456789012345678',
      from: {
        id: 000000000,
        is_bot: false,
        first_name: 'first name',
        last_name: 'last name',
        language_code: 'ko'
      },
      message: {
        message_id: 0,
        sender_chat: {
          id: -99999999999999,
          title: 'telegraom-bot-api 테스트 채널',
          type: 'channel'
        },
        chat: {
          id: -99999999999999,
          title: 'telegraom-bot-api 테스트 채널',
          type: 'channel'
        },
        date: 1654488039,
        text: 'hi',
        reply_markup: { 
          inline_keyboard: [
            [ { text: 'button 1', callback_data: 'button1' } ],
            [ { text: 'button 2', callback_data: 'button2' } ]
          ]
        },
      },
      chat_instance: '-1231231231231231233',
      data: 'button1'
    } 
  */

  let reply_message = 'button clicked!';

  // Modify the switch statement below according to the situation.
  switch (callback_data) {
    case 'button1_callback_string':
      await axios.get('http://localhost:9020/test/test6?type=button1');
      reply_message = 'You clicked button1!';
      break;
    case 'button2_callback_string':
      await axios.get('http://localhost:9020/test/test6?type=button2');
      reply_message = 'You clicked button2!';
      break;
  }

  botResponse(logHeadTail, callbackQuery, reply_message);
};

const botResponse = function(logHeadTail, callbackQuery, reply_message) {
  const msg = callbackQuery.message;

  Logger.info(logHeadTail + 'telegramBot.answerCallbackQuery call try.');
  telegramBot.answerCallbackQuery(callbackQuery.id)
    .then(() => {
      Logger.info(logHeadTail + 'telegramBot.answerCallbackQuery call success.');
      Logger.info(logHeadTail + 'telegramBot.sendMessage call try.');
      telegramBot.sendMessage(msg.chat.id, reply_message)
        .then(() => {
          Logger.info(logHeadTail + 'telegramBot.sendMessage call success.');
        })
        .catch((error) => {
          Logger.error(logHeadTail + 'telegramBot.sendMessage call error.');
          Logger.error(logHeadTail + 'error : ' + error.stack);
        });
    })
    .catch((error) => {
      Logger.error(logHeadTail + 'telegramBot.answerCallbackQuery call error.');
      Logger.error(logHeadTail + 'error.stack : ' + error.stack);
    });
};

module.exports = telegramButtonCallback;
