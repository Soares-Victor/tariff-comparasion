const httpStatusCodes = require("../httpStatusCode");
const BaseError = require("./baseError");

class BadRequestError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Bad Request.",
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = BadRequestError;
