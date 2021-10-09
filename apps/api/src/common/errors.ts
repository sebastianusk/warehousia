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

export class NotEnoughItem extends UserInputError {
  constructor(item: string, expected: number, actual: number) {
    super(`${item} not enough, need ${expected}, got ${actual}`);
  }
}

export class NotEnoughItems extends UserInputError {
  constructor(errors: {
    errors: { productId: string; expected: number; actual: number }[];
  }) {
    super('Not enough item', errors);
  }
}

export class ProductsNotFound extends UserInputError {
  constructor(products: string[]) {
    super('Products Not found', { errors: products });
  }
}

export class WrongMissingAmount extends UserInputError {
  constructor(productId: string, expected: number, missing: number) {
    super(
      `Product ${productId} just need ${expected}, claimed missing ${missing}`
    );
  }
}

export class PreparationNotFound extends UserInputError {
  constructor(id: string) {
    super(`Preparatin ${id} not found`);
  }
}
