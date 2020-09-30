require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { usersRouter, cardsRouter, rootRouter } = require('./routes');
const { authMiddleware } = require('./middlewares');
const { ERROR_CODE, ERROR_MESSAGE } = require('./constants');

const app = express();
const { PORT = 3000 } = process.env;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', rootRouter);

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use((err, req, res, next) => {
  if (err.status === ERROR_CODE.SERVER_ERROR) {
    res.status(500).send({ message: ERROR_MESSAGE.SERVER_ERROR });
  }

  res.status(err.status).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
