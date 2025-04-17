export class EntityNotFound extends Error {
  statusCode: number;

  constructor(entity: string) {
    super(`${entity} not found`);
    this.statusCode = 404;
    this.name = "EntityNotFound";
  }
}

export class ServiceUnavailable extends Error {
  statusCode: number;

  constructor(service: string) {
    super(`${service} is currently unavailable`);
    this.statusCode = 503;
    this.name = "ServiceUnavailable";
  }
}

export class BadRequest extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequest";
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.name = "InternalServerError";
  }
}
