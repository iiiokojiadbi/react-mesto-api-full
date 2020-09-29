class CustomError extends Error {
  constructor(message, statusCode, ...args) {
    super(args);
    this.message = message;
    this.status = statusCode;
  }
}

module.exports = {
  CustomError,
};
