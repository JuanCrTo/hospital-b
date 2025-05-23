import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'The message to be sent to the user',
    example: 'A reset password link has been sent to your email address'
  })
  message: string

  @ApiProperty({
    description: 'The email address to which the reset password link was sent',
    example: 'user@example.com'
  })
  emailSentTo: string
}
