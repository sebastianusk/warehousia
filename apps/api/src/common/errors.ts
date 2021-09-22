/* eslint-disable max-classes-per-file */
import { AuthenticationError, UserInputError } from 'apollo-server-express';

export class LoginError extends AuthenticationError {
  constructor() {
    super('username or password wrong');
  }
}

export class EnumNotValid extends UserInputError {
  constructor(field: string, got: string) {
    super(`enum ${field} don't have value ${got}`);
  }
}

export class ObjectAlreadyExist extends UserInputError {
  constructor(got: string) {
    super(`${got} already exists`);
  }
}

export class ObjectNotFound extends UserInputError {
  constructor(field: string) {
    super(`one of ${field} not exist`);
  }
}

export class FieldEmpty extends UserInputError {
  constructor(field: string) {
    super(`${field} cannot be empty`);
  }
}
