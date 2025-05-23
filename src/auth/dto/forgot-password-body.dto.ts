import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordBodyDto {
  @ApiProperty({description: 'The email of the user'})
  email: string
}
