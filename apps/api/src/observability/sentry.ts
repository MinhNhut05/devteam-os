import * as Sentry from '@sentry/node';

let sentryEnabled = false;

function parseSampleRate(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, 0), 1);
}

export function initSentry(): boolean {
  if (sentryEnabled) return true;

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return false;

  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
    tracesSampleRate: parseSampleRate(process.env.SENTRY_TRACES_SAMPLE_RATE, 0.1),
  });

  sentryEnabled = true;
  return true;
}

export function isSentryEnabled(): boolean {
  return sentryEnabled;
}
