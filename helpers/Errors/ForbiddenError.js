class ForbiddenError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 403;
  }
}

module.exports = ForbiddenError;
