import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AdminModule from '../admin/admin.module';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import jwtConstants from './constant';
import JwtStrategy from './jwt.strategy';
import RolesGuard from './roles.guard';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, RolesGuard],
})
export default class AuthModule {}
