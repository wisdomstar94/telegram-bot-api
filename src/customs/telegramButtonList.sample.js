// When sending a telegram message, please write a list of buttons to be sent together.
const telegramButtonList = [
  [{ text: 'button 1', callback_data: 'button1_callback_string' }],
  [{ text: 'button 2', callback_data: 'button2_callback_string' }],
  // more...
];

module.exports = telegramButtonList;
