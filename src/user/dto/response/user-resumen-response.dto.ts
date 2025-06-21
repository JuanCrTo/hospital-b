import { ApiProperty } from '@nestjs/swagger'
import { USER_ROLES, UserRole } from '../../enums/user-role.enum'

export class UserResumenResponseDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string

  @ApiProperty({ example: 'patient', enum: USER_ROLES })
  role: UserRole
}
