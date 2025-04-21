import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './model/user.schema'
import { PatientModule } from 'src/patient/patient.module'
import { HttpModule } from '@nestjs/axios'
import { EmailService } from '../email/email.service'
import { EmailModule } from 'src/email/email.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PatientModule, EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
