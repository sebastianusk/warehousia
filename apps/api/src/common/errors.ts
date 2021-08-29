import { AuthenticationError } from 'apollo-server-express';

// eslint-disable-next-line import/prefer-default-export
export class LoginError extends AuthenticationError {
  constructor() {
    super('username or password wrong');
  }
}
