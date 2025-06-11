// shared/errors/BaseError.ts
export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly success: boolean;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}
