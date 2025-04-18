export class EntityNotFound extends Error {
  statusCode: number;

  constructor(entity: string) {
    super(`${entity}`);
    this.statusCode = 404;
    this.name = "EntityNotFound";
  }
}

export class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.name = "Unauthorized";
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
