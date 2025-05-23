import { ApiProperty } from '@nestjs/swagger'

export class SignInBodyDto {
  @ApiProperty()
  email: string
}
