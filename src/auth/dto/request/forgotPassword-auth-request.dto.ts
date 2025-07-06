import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com'
  })
  email: string
}
