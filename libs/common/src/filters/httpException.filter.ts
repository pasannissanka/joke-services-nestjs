import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../../../types/src';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(`Exception: ${exception}, path: ${request.url}`);
    this.logger.error(exception);

    const responseBody = ResponseDto.error({
      message: exception.message,
      error: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });

    response.status(status).json(responseBody);
  }
}
