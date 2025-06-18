import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger'
import { ResponseDto } from 'src/common/dto/response.dto'

export function ApiStandardResponse<TModel extends Type<any>>(model: TModel | null, status: 200 | 201 | 204 = 200) {
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

  const exampleData = model
  ? {
      email: 'user@example.com',
      role: 'patient',
      patientDetails: {
        identification: '1234567890',
        firstname: 'John',
        middlename: 'Doe',
        lastname: 'Smith',
        secondlastname: 'Johnson',
        birth: '1990-01-01',
        location: 'apex las vegas'
      }
    }
  : null

  const exampleSuccess = {
    timestamp: '2025-06-12T20:13:00.000Z',
    message: 'Operación realizada con éxito',
    success: true,
    statusCode: status,
    data: exampleData
  }

  const decorators = {
    200: ApiOkResponse({ schema: schemaBase, example: exampleSuccess }),
    201: ApiCreatedResponse({ schema: schemaBase, example: exampleSuccess }),
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
      },
      example: {
        timestamp: '2025-06-12T20:13:00.000Z',
        message: 'Operación realizada con éxito',
        success: true,
        statusCode: 204,
        data: null
      }
    })
  }

  return applyDecorators(ApiExtraModels(ResponseDto), decorators[status])
}
