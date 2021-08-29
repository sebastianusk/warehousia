/* eslint-disable max-classes-per-file */
import { AuthenticationError, UserInputError } from 'apollo-server-express';

export class LoginError extends AuthenticationError {
  constructor() {
    super('username or password wrong');
  }
}

export class CreateUserError extends UserInputError {
  constructor() {
    super('user already exists');
  }
}
