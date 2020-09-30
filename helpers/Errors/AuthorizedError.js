class AuthorizedError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 401;
  }
}

module.exports = AuthorizedError;
