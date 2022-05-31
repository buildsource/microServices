import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as chalk from 'chalk';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const ex = exception.getResponse();

    const logger = new Logger('ERROR');

    const log = (...args) => logger.log(chalk.red(...args));

    const requestUrl = `${request.protocol}://${request.get('host')}${
      request.originalUrl
    }`;

    log(
      '---------------------------------------------------------------------------------',
    );
    log('response method:', request.method);
    log('response url: ' + requestUrl);
    log('response timestamp: ' + new Date().toISOString());
    log('response statusCode: ' + status);
    log('response message: ' + ex['message']);
    log(
      '---------------------------------------------------------------------------------',
    );

    response.status(status).json(exception.getResponse());
  }
}
