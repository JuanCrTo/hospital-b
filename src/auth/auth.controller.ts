import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '../decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/request/signIn-auth-request.dto'
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { ForgotPasswordResponseDto } from './dto/response/forgotPassword-auth-response.dto'
import { SignInResponseDto } from './dto/response/signIn-auth-response.dto'
import { ForgotPasswordBodyDto } from './dto/request/forgotPassword-auth-request.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signIn')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiOkResponse({
    description: 'User signed in successfully',
    type: SignInResponseDto
  })
  @ApiBadRequestResponse({ description: 'Missing or invalid credentials' })
  @ApiBody({
    description: 'User credentials',
    type: SignInDto
  })
  async signIn(@Body() credentials: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(credentials.email, credentials.password)
  }

  @Public()
  @Post('forgotpassword')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiOkResponse({
    description: 'Password reset email sent',
    type: ForgotPasswordResponseDto
  })
  @ApiBody({
    description: 'User email',
    type: ForgotPasswordBodyDto
  })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.handleForgotPassword(email)
  }
}
