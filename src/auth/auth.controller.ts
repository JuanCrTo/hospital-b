import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { Public } from 'src/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { UserService } from 'src/user/user.service'
import { EmailService } from 'src/email/email.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('signIn')
  async signIn(@Body() { email, password }: SignInDto): Promise<{ access_token: string }> {
    const access_token = await this.authService.signIn(email, password)
    return { access_token }
  }

  @Post('forgotpassword')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.handleForgotPassword(email)
  }
}
