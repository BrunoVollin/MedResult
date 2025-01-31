import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const detail = exception.detail;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const messageStart = exception.table.split('_').join(' ') + ' with';
      const message = exception.detail.replace('Key', messageStart);
      response.status(400).json({
        statusCode: 400,
        message: [message],
        error: 'Bad Request',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: exception.name,
      });
    }
  }
}
