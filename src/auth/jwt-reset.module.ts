import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtSetPasswordConfigService } from 'src/auth/jwt-set-password-config/jwt-set-password-config.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtSetPasswordConfigService
    })
  ],
  exports: [JwtModule]
})
export class JwtResetModule {}
