import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Operación realizada con éxito' })
  message: string;

  @ApiProperty({ nullable: true })
  data: T;

  @ApiProperty({ example: '2025-06-12T20:13:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/v1/patient/123', required: false })
  path?: string;

  @ApiProperty({ example: 'INTERNAL_ERROR', required: false })
  errorCode?: string;

  @ApiProperty({ nullable: true, required: false })
  details?: string | null;

  @ApiProperty({ example: '97af134e-bab9-4e13-b9c1-f10dbe56cf92', required: false })
  traceId?: string;
}
