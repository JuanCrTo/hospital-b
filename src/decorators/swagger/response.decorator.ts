import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger'
import { ResponseDto } from 'src/common/dto/response.dto'

export function ApiStandardResponse<T extends Type<unknown>>(model: T | null, status: 200 | 201 | 204 | 208 = 200) {
  const schemaBase = {
    allOf: [
      { $ref: getSchemaPath(ResponseDto) },
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
    200: ApiOkResponse({
      schema: schemaBase
    }),
    201: ApiCreatedResponse({
      schema: schemaBase
    }),
    204: ApiNoContentResponse({
      description: 'No content. Response body contains standard envelope with data = null',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: { type: 'null', nullable: true }
            }
          }
        ]
      }
    })
  }

  const extraModels = [ResponseDto]
  if (model) {
    extraModels.push(model as any)
  }

  return applyDecorators(ApiExtraModels(...extraModels), decorators[status])
}