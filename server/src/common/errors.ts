class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

class EntityNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 403);
  }
}

class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

class IntegrationError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

class EmailIntegrationError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

export { BaseError, BadRequestError, EntityNotFoundError, ForbiddenError, ValidationError, IntegrationError, EmailIntegrationError };
