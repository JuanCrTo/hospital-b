import { ApiProperty } from '@nestjs/swagger'

export class SignInResponseDto {
  @ApiProperty({description: 'JWT access token'})
  access_token: string
}
