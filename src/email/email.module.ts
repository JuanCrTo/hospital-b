import { forwardRef, Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { PatientModule } from 'src/patient/patient.module'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [ConfigModule, HttpModule, PatientModule, forwardRef(() => UserModule)],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
