import { randomUUID } from 'crypto';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Params } from 'nestjs-pino';

type RequestWithUser = IncomingMessage & {
  id?: string;
  user?: {
    id?: string;
    sub?: string;
  };
};

function parseBoolean(value: string | undefined): boolean {
  return value === 'true' || value === '1';
}

function getRequestId(req: IncomingMessage, res: ServerResponse): string {
  const requestIdHeader = req.headers['x-request-id'];
  const requestId = Array.isArray(requestIdHeader) ? requestIdHeader[0] : requestIdHeader;

  const id = requestId || randomUUID();
  res.setHeader('x-request-id', id);
  return id;
}

export function createPinoLoggerOptions(): Params {
  const prettyLogs = parseBoolean(process.env.LOG_PRETTY);

  return {
    pinoHttp: {
      autoLogging: {
        ignore: (req) => req.url === '/health',
      },
      customProps: (req: RequestWithUser) => {
        const userId = req.user?.id ?? req.user?.sub;
        return userId ? { userId } : {};
      },
      genReqId: getRequestId,
      level: process.env.LOG_LEVEL || 'info',
      redact: {
        censor: '[REDACTED]',
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'req.headers["x-api-key"]',
          'req.headers["set-cookie"]',
          'res.headers["set-cookie"]',
          'req.body.password',
          'req.body.currentPassword',
          'req.body.newPassword',
          'req.body.token',
          'req.body.accessToken',
          'req.body.refreshToken',
          '*.password',
          '*.token',
          '*.accessToken',
          '*.refreshToken',
        ],
      },
      transport: prettyLogs
        ? {
            target: 'pino-pretty',
            options: {
              colorize: process.env.NODE_ENV !== 'production',
              ignore: 'pid,hostname',
              singleLine: true,
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
    },
  };
}
