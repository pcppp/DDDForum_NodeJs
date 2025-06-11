// shared/errors/UserAlreadyExistsError.ts
import { BaseError } from './BaseError';

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('该用户已存在', 409); // HTTP 409 Conflict
  }
}
export class InvalidEmailError extends BaseError {
  constructor() {
    super('邮箱格式不正确', 422); // HTTP 422 Unprocessable Entity
  }
}
