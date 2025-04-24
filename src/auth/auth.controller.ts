import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'src/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { UserService } from 'src/user/user.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('signIn')
  async signIn(@Body() { email, password }: SignInDto): Promise<{ access_token: string }> {
    const access_token = await this.authService.signIn(email, password)
    return { access_token }
  }

  // forgotPassword
  // Verify if the email is exist in the database (User Service findByEmail), generate a token (Auth Service generateResetTokenJWT), create a unique link with the token and send the email to the user (Email Service forgotpassword)
  // ! Falta crear el link único con el token y enviarlo por email
  @Post('forgotpassword')
  async forgotPassword(@Body('email') email: string): Promise<{ resetToken: string }> {
    const user = await this.userService.findByEmail(email)

    const token = await this.authService.generateResetTokenJWT(user)
    return { resetToken: token } // Esto luego se usará en un link en el email
  }
}
