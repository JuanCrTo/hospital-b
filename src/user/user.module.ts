import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './model/user.schema'
import { PatientModule } from '@/patient/patient.module'
import { EmailModule } from '@/email/email.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PatientModule, forwardRef(() => EmailModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule]
})
export class UserModule {}
