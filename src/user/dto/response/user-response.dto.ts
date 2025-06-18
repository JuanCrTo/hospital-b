import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { USER_ROLES, UserRole } from '../../enums/user-role.enum'
import { CreatePatientDto } from 'src/patient/dto/request/create-patient-request.dto'

export class UserResponseDto {
  @ApiProperty({ example: 'user@example.com' })
  @Expose()
  email: string

  @ApiProperty({ example: 'patient', enum: USER_ROLES })
  @Expose()
  role: UserRole

  @ApiPropertyOptional({ type: () => CreatePatientDto })
  @Expose()
  patientDetails?: CreatePatientDto
}
