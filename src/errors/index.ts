class CustomError extends Error {
  constructor(public message: string, public statusCode: number | string) {
    super(message);
    this.statusCode =
      typeof statusCode === 'string' ? parseInt(statusCode) : statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class AccessDeniedError extends CustomError {
  constructor(message = 'Access denied.') {
    super(message, 403);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized.') {
    super(message, 401);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request.') {
    super(message, 400);
  }
}

export { AccessDeniedError, UnauthorizedError, BadRequestError };
