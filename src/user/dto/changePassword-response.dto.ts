import { ApiProperty } from '@nestjs/swagger'

export class changePasswordResponseDto {
  @ApiProperty()
  password: string
}
