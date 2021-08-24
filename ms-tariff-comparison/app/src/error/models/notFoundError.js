const httpStatusCodes = require("../httpStatusCode");
const BaseError = require("./baseError");

class NotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = NotFoundError;
