const regExpEmpty = /^\S/;

const validateText = (text) => regExpEmpty.test(text);

module.exports = {
  validateText,
};
