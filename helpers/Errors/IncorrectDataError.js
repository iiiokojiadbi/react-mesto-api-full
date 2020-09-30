class IncorrectDataError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 400;
  }
}

module.exports = IncorrectDataError;
