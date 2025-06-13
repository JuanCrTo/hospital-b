import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'

export function ApiAuthResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Missing or invalid credentials',
      type: ''
    }),
    ApiUnauthorizedResponse({ description: 'JWT is missing, invalid or expired' })
  )
}
