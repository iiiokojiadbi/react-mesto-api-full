const UPDATE_OPTIONS = {
  new: true,
  runValidators: true,
  upsert: true,
};

const LIKE_OPTIONS = {
  new: true,
};

const ERROR_MESSAGE = {
  CARD_NOT_FOUND: 'Карточка с таким id не найдена',
  USER_NOT_FOUND: 'Пользователь с таким id не найден',
  INCORRECT_DATA: 'Неправильные данные',
  SERVER_ERROR: 'Ошибка сервера',
  NOT_FOUND: 'Запрошенный ресурс не найден',
  UNAUTHORIZED: 'Неправильные почта или пароль',
  NOT_AUTHORIZED: 'Не авторизован',
};

const ERROR_CODE = {
  INCORRECT_DATA: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const allowedCors = [
  'https://www.i-mesto.students.nomoreparties.co',
  'http://www.i-mesto.students.nomoreparties.co',
  'https://i-mesto.students.nomoreparties.co',
  'http://i-mesto.students.nomoreparties.co',
];

module.exports = {
  UPDATE_OPTIONS,
  LIKE_OPTIONS,
  ERROR_MESSAGE,
  ERROR_CODE,
};
