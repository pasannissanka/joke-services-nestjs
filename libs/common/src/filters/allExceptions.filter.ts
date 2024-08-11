import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseDto } from '../../../types/src';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    this.logger.error(
      `Unhandled Exception: ${JSON.stringify(exception)}, path: ${path}`,
    );
    this.logger.error(exception);

    const response = ResponseDto.error({
      message: message,
      error: {
        path: path,
        timestamp: new Date().toISOString(),
        statusCode: httpStatus,
        exception: exception,
      },
    });

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}
