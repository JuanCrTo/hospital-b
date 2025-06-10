import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignInConfigService } from './jwt-sign-in-config/jwt-sign-in-config.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UserModule,
    EmailModule,
    JwtModule.registerAsync({
      global: false,
      useClass: JwtSignInConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
