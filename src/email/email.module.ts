import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
