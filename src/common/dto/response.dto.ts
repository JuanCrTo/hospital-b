import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto<T = any> {
  @ApiProperty({ example: '2025-06-12T20:13:00.000Z' })
  timestamp: string

  @ApiProperty({ example: 'Operación realizada con éxito' })
  message: string // message para todos los roles

  @ApiProperty({ example: true })
  success: boolean

  @ApiProperty({ example: 200 })
  statusCode: number

  // @ApiProperty({ required: false, nullable: true })
  // stack?: string | null // ! 400 y 500
  // // ? Admin y Superadmin

  // @ApiProperty({ nullable: true, required: false })
  // details?: string | null // ? message para admin y superadmin

  @ApiProperty({ type: () => Object })
  data: T

  // @ApiProperty({ example: '97af134e-bab9-4e13-b9c1-f10dbe56cf92', required: false })
  // traceId?: string // TODO: Microservices
}
