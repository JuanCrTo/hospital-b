import { ApiProperty } from '@nestjs/swagger'
import { USER_ROLES, UserRole } from '../../enums/user-role.enum'
import { PatientResponseDto } from 'src/patient/dto/response/patient-response.dto'

export class UserDetailsResponseDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string

  @ApiProperty({ example: 'patient', enum: USER_ROLES })
  role: UserRole

  @ApiProperty({ type: () => PatientResponseDto })
  patientDetails?: PatientResponseDto
}
