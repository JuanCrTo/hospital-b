import { UserResumenResponseDto } from '../dto/response/user-resumen-response.dto'
import { UserRole } from '../enums/user-role.enum'
import { User } from '../model/user.schema'

export function mapUserResumenToDto(user: Partial<User>): UserResumenResponseDto {
  if (!user) return undefined

  return {
    email: user.email,
    role: user.role as UserRole
  }
}
