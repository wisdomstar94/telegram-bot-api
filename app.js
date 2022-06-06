require('dotenv').config();

const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const corsOptions = {
  origin: process.env.CORS_ALLOW_LIST.split(','),
  credentials: true,
  optionsSuccessStatus: 200,
};

const corsMiddleWare = cors(corsOptions);
const setUniqueRequestTailMiddleWare = require('./src/middlewares/setUniqueRequestTail');
const setLoggingMiddleWare = require('./src/middlewares/setLogging');
const errorHandlerMiddleWare = require('./src/middlewares/errorHandler');

const telegramRouter = require('./src/routers/telegram');

const app = express();

app.use(setUniqueRequestTailMiddleWare);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.raw());
app.use(express.text());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(session({
  resave: false, 
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000,
  },
}));
app.use(setLoggingMiddleWare);
app.use(corsMiddleWare);

app.use('/telegram', telegramRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandlerMiddleWare);

app.listen(process.env.PORT, function() {
  console.log(`${process.env.PORT} port listening..`);
});
