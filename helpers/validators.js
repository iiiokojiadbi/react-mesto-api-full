const regExpUrl = /https?:\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/;
const regExpEmpty = /^\S/;

const validateUrl = (link) => regExpUrl.test(link);
const validateText = (text) => regExpEmpty.test(text);

module.exports = {
  validateUrl,
  validateText,
};
