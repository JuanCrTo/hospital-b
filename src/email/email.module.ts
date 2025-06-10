import { forwardRef, Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { PatientModule } from '@/patient/patient.module'
import { UserModule } from '@/user/user.module'
import { EmailConsumer } from './email.consumer'
import { RabbitMQModule } from '@/rabbitmq/rabbitmq.module'
RabbitMQModule

@Module({
  imports: [ConfigModule, HttpModule, PatientModule, RabbitMQModule, forwardRef(() => UserModule)],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService]
})
export class EmailModule {}
