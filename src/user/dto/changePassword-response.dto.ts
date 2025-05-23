import { ApiProperty } from '@nestjs/swagger'

export class changePasswordResponseDto {
  @ApiProperty({description: 'password changed successfully'})
  password: string
}
