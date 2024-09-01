const {StatusCodes} = require('http-status-codes')

class CustomApiErrors extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequest extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BadRequest;
  }
}

class NotFound extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.status = StatusCodes.NotFound;
  }
}

class Unauthorized extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.status = StatusCodes.Unauthorized;
  }
}

module.exports = {
  BadRequest,
  NotFound,
  Unauthorized,
  CustomApiErrors,
}


