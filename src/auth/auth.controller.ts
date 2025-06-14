import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '../decorators/request/public.decorator'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/request/signIn-auth-request.dto'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { SignInResponseDto } from './dto/response/signIn-auth-response.dto'
import { ForgotPasswordBodyDto } from './dto/request/forgotPassword-auth-request.dto'
import { ApiStandardResponse } from 'src/decorators/swagger/response.decorator'
import { ApiStandardError } from 'src/decorators/swagger/error.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signIn')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiStandardResponse(SignInDto)
  @ApiStandardError()
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
  @ApiStandardResponse(SignInDto)
  @ApiStandardError()
  @ApiBody({
    description: 'User email',
    type: ForgotPasswordBodyDto
  })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.handleForgotPassword(email)
  }
}
