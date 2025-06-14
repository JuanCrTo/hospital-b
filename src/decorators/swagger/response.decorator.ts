import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, getSchemaPath } from '@nestjs/swagger'
import { BaseResponseDto } from 'src/common/dto/base-response.dto'

export function ApiStandardResponse<TModel extends Type<any>>(model: TModel | null, status: 200 | 201 | 204 = 200) {
  const schemaBase = {
    allOf: [
      { $ref: getSchemaPath(BaseResponseDto) },
      model
        ? {
            properties: {
              data: { $ref: getSchemaPath(model) }
            }
          }
        : {}
    ]
  }

  const decorators = {
    200: ApiOkResponse({ schema: schemaBase }),
    201: ApiCreatedResponse({ schema: schemaBase }),
    204: ApiNoContentResponse({
      description: 'No content. Response body contains standard envelope with data = null',
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: { type: 'null', nullable: true }
            }
          }
        ]
      }
    })
  }

  return applyDecorators(decorators[status])
}
