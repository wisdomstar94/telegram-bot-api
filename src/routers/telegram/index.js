const express = require('express');
const router = express.Router();
const botMessageSendRouter = require('./child_routes/botMessageSend');

router.post('/bot/message/send', botMessageSendRouter);

module.exports = router;
