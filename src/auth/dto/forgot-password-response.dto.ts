import { ApiResponseProperty } from '@nestjs/swagger'

export class ForgotPasswordResponseDto {
  @ApiResponseProperty({
    type: 'string',
    example: 'A reset password link has been sent to your email address'
  })
  message: string

  @ApiResponseProperty({
    type: 'string',
    example: 'user@example.com'
  })
  emailSentTo: string
}
