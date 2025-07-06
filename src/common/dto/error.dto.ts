import { ApiProperty } from '@nestjs/swagger'

export class ErrorDto<T = any> {
  @ApiProperty({ example: '2025-06-12T20:13:00.000Z' })
  timestamp: string

  @ApiProperty({ example: 'Recursos no encontrado' })
  message: string // message para todos los roles

  @ApiProperty({ example: false })
  success: boolean

  @ApiProperty({ example: 404 })
  statusCode: number

  @ApiProperty({ example: 'NOT_FOUND', required: false })
  errorCode?: string // ! 400 y 500

  @ApiProperty({ example: '/api/v1/patient/123', required: false })
  path?: string // ! Solo 400 y 500

  // @ApiProperty({ required: false, nullable: true })
  // stack?: string | null // ! 400 y 500
  // // ? Admin y Superadmin

  // @ApiProperty({ nullable: true, required: false })
  // details?: string | null // ? message para admin y superadmin

  @ApiProperty({ nullable: true })
  data: T

  // @ApiProperty({ example: '97af134e-bab9-4e13-b9c1-f10dbe56cf92', required: false })
  // traceId?: string // TODO: Microservices
}
