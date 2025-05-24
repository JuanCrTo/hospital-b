import { ApiResponseProperty } from '@nestjs/swagger'

export class changePasswordResponseDto {
  @ApiResponseProperty({
    type: 'string',
    example: 'Password changed successfully'
  })
  password: string
}
