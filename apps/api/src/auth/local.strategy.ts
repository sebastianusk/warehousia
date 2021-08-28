import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { Strategy } from 'passport-local';
import AuthService from './auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new AuthenticationError('username/password wrong');
    }
    return user;
  }
}
