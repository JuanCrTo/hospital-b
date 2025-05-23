import { ApiProperty } from '@nestjs/swagger'

export class changePasswordResponseDto {
  @ApiProperty({
    description: 'password changed successfully',
    example: 'Password changed successfully'
  })
  password: string
}
