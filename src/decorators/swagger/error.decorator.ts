import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse
} from '@nestjs/swagger'
import { ErrorDto } from 'src/common/dto/error.dto'

export function ApiStandardError() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Petición incorrecta', type: ErrorDto }),
    ApiUnauthorizedResponse({ description: 'No autenticado', type: ErrorDto }),
    ApiForbiddenResponse({ description: 'No autorizado', type: ErrorDto }),
    ApiNotFoundResponse({ description: 'Recurso no encontrado', type: ErrorDto }),
    ApiConflictResponse({ description: 'Conflicto', type: ErrorDto }),
    // !@ApiTooManyRequestsResponse({ description: 'Demasiadas peticiones', type: ErrorDto }),
    ApiInternalServerErrorResponse({ description: 'Error interno', type: ErrorDto })
  )
}
