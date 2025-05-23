import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordResponseDto {
  @ApiProperty({description: 'The message to be sent to the user'})
  message: string

  @ApiProperty({description: 'The email address to which the reset password link was sent'})
  emailSentTo: string
}
