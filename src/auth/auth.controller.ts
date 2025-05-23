import { Body, Controller, Post } from '@nestjs/common'
import { Public } from 'src/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto'
import { SignInResponseDto } from './dto/signIn-response.dto'
import { ForgotPasswordBodyDto } from './dto/forgot-password-body.dto'
import { ApiAuthResponses } from 'src/decorators/apiAuthResponse.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signIn')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiOkResponse({ description: 'User signed in successfully', type: SignInResponseDto })
  @ApiBadRequestResponse({ description: 'Missing or invalid credentials' })
  @ApiBody({ description: 'User credentials', type: SignInDto })
  async signIn(@Body() { email, password }: SignInDto): Promise<{ access_token: string }> {
    const access_token = await this.authService.signIn(email, password)
    return { access_token }
  }

  @ApiBearerAuth('JWT-auth')
  @Post('forgotpassword')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiOkResponse({ description: 'Password reset email sent', type: ForgotPasswordResponseDto })
  @ApiAuthResponses()
  @ApiBody({ description: 'User email', type: ForgotPasswordBodyDto })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.handleForgotPassword(email)
  }
}
