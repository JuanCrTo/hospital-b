import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Public } from '../decorators/request/public.decorator'
import { AuthService } from './auth.service'
import { SignInRequestDto } from './dto/request/signIn-auth-request.dto'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { SignInResponseDto } from './dto/response/signIn-auth-response.dto'
import { ForgotPasswordRequestDto } from './dto/request/forgotPassword-auth-request.dto'
import { ApiStandardResponse } from 'src/decorators/swagger/response.decorator'
import { ApiStandardError } from 'src/decorators/swagger/error.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signIn')
  @HttpCode(201)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiStandardResponse(SignInResponseDto, 201)
  @ApiStandardError()
  @ApiBody({
    description: 'User credentials',
    type: SignInRequestDto
  })
  async signIn(@Body() credentials: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(credentials.email, credentials.password)
  }

  @Public()
  @Post('forgotpassword')
  @HttpCode(201)
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiStandardResponse(SignInRequestDto, 201)
  @ApiStandardError()
  @ApiBody({
    description: 'User email',
    type: ForgotPasswordRequestDto
  })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.handleForgotPassword(email)
  }
}
