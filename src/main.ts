import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: [configService.get<string>('LOCAL_URL_2'), configService.get<string>('LOCAL_URL')],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseInterceptor())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hospital Yellow API')
    .setDescription('API para el sistema de gestión hospitalaria')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'JWT-auth'
    )
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get<number>('PORT'))
}
bootstrap()
