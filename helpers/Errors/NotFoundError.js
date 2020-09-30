class NotFoundError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 404;
  }
}

module.exports = NotFoundError;
