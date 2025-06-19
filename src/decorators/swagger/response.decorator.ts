import { applyDecorators, Type } from '@nestjs/common'
import { 
  ApiOkResponse, 
  ApiCreatedResponse, 
  ApiNoContentResponse, 
  getSchemaPath, 
  ApiExtraModels 
} from '@nestjs/swagger'
import { ResponseDto } from 'src/common/dto/response.dto'

// Función auxiliar para extraer el ejemplo del modelo
function extractModelExample<TModel extends Type<any>>(model: TModel): any {
  if (!model) return undefined

  const instance = new model()
  const prototype = Object.getPrototypeOf(instance)
  const example: any = {}

  // Obtener todas las propiedades del modelo incluyendo las heredadas
  const propertyNames = new Set<string>()
  
  // Propiedades de la instancia
  Object.getOwnPropertyNames(instance).forEach(prop => propertyNames.add(prop))
  
  // Propiedades del prototipo (decoradores de Swagger)
  let currentPrototype = prototype
  while (currentPrototype && currentPrototype !== Object.prototype) {
    Object.getOwnPropertyNames(currentPrototype).forEach(prop => {
      if (prop !== 'constructor') {
        propertyNames.add(prop)
      }
    })
    currentPrototype = Object.getPrototypeOf(currentPrototype)
  }

  // Extraer ejemplos de los metadatos de Swagger
  propertyNames.forEach(propertyKey => {
    const propertyMetadata = Reflect.getMetadata('swagger/apiModelProperties', instance, propertyKey)
    if (propertyMetadata?.example !== undefined) {
      example[propertyKey] = propertyMetadata.example
    }
  })

  return Object.keys(example).length > 0 ? example : undefined
}

export function ApiStandardResponse<TModel extends Type<any>>(
  model: TModel | null,
  status: 200 | 201 | 204 = 200
) {
  const modelExample = model ? extractModelExample(model) : undefined
  
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

  const createExampleResponse = (statusCode: number, data?: any) => ({
    timestamp: new Date().toISOString(),
    message: 'Operación realizada con éxito',
    success: true,
    statusCode,
    data: data !== undefined ? data : (statusCode === 204 ? null : undefined)
  })

  const decorators = {
    200: ApiOkResponse({ 
      schema: schemaBase, 
      ...(modelExample ? { example: createExampleResponse(200, modelExample) } : {})
    }),
    201: ApiCreatedResponse({ 
      schema: schemaBase, 
      ...(modelExample ? { example: createExampleResponse(201, modelExample) } : {})
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
      },
      example: createExampleResponse(204, null)
    })
  }

  // Agregar modelos extra dinámicamente
  const extraModels = [ResponseDto]
  if (model) {
    extraModels.push(model)
  }

  return applyDecorators(ApiExtraModels(...extraModels), decorators[status])
}