import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const traceId = uuidv4()
    const timestamp = new Date().toISOString()
    const path = request.url

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const errorResponse = exception instanceof HttpException ? exception.getResponse() : null

    const message =
      errorResponse && typeof errorResponse === 'object' && 'message' in errorResponse ? (errorResponse as any).message : 'Error interno del servidor'

    const stack = exception instanceof Error ? exception.stack : null

    const responseBody = {
      timestamp,
      message,
      success: false,
      statusCode: status,
      errorCode: (errorResponse as any)?.errorCode ?? 'INTERNAL_ERROR',
      path,
      stack,
      details: null,
      data: null,
      traceId
    }

    response.status(status).json(responseBody)
  }
}
