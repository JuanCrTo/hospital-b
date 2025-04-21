import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { PatientModule } from 'src/patient/patient.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from './http-config/http-config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    PatientModule,
  ],
  controllers: [UserController],
  providers: [UserService, HttpConfigService],
  exports: [UserService],
})
export class UserModule {}
