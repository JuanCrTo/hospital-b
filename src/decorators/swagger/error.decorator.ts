import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse
} from '@nestjs/swagger'
import { BaseResponseDto } from 'src/common/dto/base-response.dto'

export function ApiStandardError() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Petición incorrecta', type: BaseResponseDto }),
    ApiUnauthorizedResponse({ description: 'No autenticado', type: BaseResponseDto }),
    ApiForbiddenResponse({ description: 'No autorizado', type: BaseResponseDto }),
    ApiNotFoundResponse({ description: 'Recurso no encontrado', type: BaseResponseDto }),
    ApiConflictResponse({ description: 'Conflicto', type: BaseResponseDto }),
    // !@ApiTooManyRequestsResponse({ description: 'Demasiadas peticiones', type: BaseResponseDto }),
    ApiInternalServerErrorResponse({ description: 'Error interno', type: BaseResponseDto })
  )
}
