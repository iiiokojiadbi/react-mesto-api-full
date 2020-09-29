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
  INCORRECT_USER_DATA: 'Неправильные данные пользователя',
  INCORRECT_AVATAR_DATA: 'Неправильные данные аватара пользователя',
  INCORRECT_CARD_DATA: 'Неправильные данные карточки',
  SERVER_ERROR: 'Ошибка сервера',
  NOT_FOUND: 'Запрошенный ресурс не найден',
};

const ERROR_CODE = {
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

module.exports = {
  UPDATE_OPTIONS,
  LIKE_OPTIONS,
  ERROR_MESSAGE,
  ERROR_CODE,
};
