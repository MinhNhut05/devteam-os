import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { isSentryEnabled } from '@/observability/sentry';

type RequestWithUser = {
  id?: string;
  method?: string;
  originalUrl?: string;
  url?: string;
  user?: {
    id?: string;
    sub?: string;
  };
};

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (isSentryEnabled() && !(exception instanceof HttpException)) {
      this.captureException(exception, host);
    }

    new BaseExceptionFilter(this.adapterHost.httpAdapter).catch(exception, host);
  }

  private captureException(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== 'http') {
      Sentry.captureException(exception);
      return;
    }

    const request = host.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.id ?? request.user?.sub;

    Sentry.withScope((scope) => {
      if (request.id) {
        scope.setTag('requestId', request.id);
      }
      if (userId) {
        scope.setUser({ id: userId });
      }
      scope.setContext('request', {
        method: request.method,
        url: request.originalUrl ?? request.url,
      });
      Sentry.captureException(exception);
    });
  }
}
