require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const { errors } = require('celebrate');
const { usersRouter, cardsRouter, rootRouter } = require('./routes');
const { authMiddleware, checkCorsMiddleware } = require('./middlewares');
const { ERROR_CODE, ERROR_MESSAGE } = require('./constants');
const { requestLoggerMiddleware, errorLoggerMiddleware } = require('./middlewares/logger');
const { NotFoundError } = require('./helpers/Errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, повторите запрос позже',
});

app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(checkCorsMiddleware);
app.use(requestLoggerMiddleware);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', rootRouter);

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(() => {
  throw new NotFoundError({ message: ERROR_MESSAGE.NOT_FOUND });
});

app.use(errorLoggerMiddleware);

app.use(errors());
// eslint-disable-next-line
app.use((err, req, res, next) => {
  if (err.status !== ERROR_CODE.SERVER_ERROR) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(ERROR_CODE.SERVER_ERROR).send({ message: ERROR_MESSAGE.SERVER_ERROR });
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
