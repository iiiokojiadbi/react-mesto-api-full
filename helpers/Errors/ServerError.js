class ServerError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 500;
  }
}

module.exports = ServerError;
