import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger'
import { BaseResponseDto } from 'src/common/dto/base-response.dto'
import { getSchemaPath } from '@nestjs/swagger'

export function ApiStandardResponse<TModel extends Type<any>>(model: TModel, isCreated = false) {
  return applyDecorators(
    isCreated
      ? ApiCreatedResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(BaseResponseDto) },
              {
                properties: {
                  data: { $ref: getSchemaPath(model) }
                }
              }
            ]
          }
        })
      : ApiOkResponse({
          schema: {
            allOf: [
              { $ref: getSchemaPath(BaseResponseDto) },
              {
                properties: {
                  data: { $ref: getSchemaPath(model) }
                }
              }
            ]
          }
        })
  )
}
