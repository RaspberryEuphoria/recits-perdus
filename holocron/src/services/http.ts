import express from 'express';
import createHttpError from 'http-errors';

import { AuthService } from './AuthService';

/**
 * Parse a route/body id. Throws a 400 instead of letting NaN reach Prisma.
 */
export function parseId(value: unknown, name = 'id'): number {
  const id = typeof value === 'number' ? value : parseInt(String(value), 10);
  if (!Number.isInteger(id) || id <= 0) {
    throw createHttpError.BadRequest(`Invalid ${name}`);
  }
  return id;
}

/**
 * Keep only the listed keys that are actually present (not undefined) on the source object.
 * Prevents mass-assignment of arbitrary/nested Prisma fields from request bodies.
 */
export function pick<T extends object, K extends keyof T>(source: T, keys: readonly K[]) {
  const result = {} as Pick<T, K>;
  if (!source || typeof source !== 'object') return result;
  for (const key of keys) {
    if (source[key] !== undefined) result[key] = source[key];
  }
  return result;
}

export function requireString(value: unknown, name: string, maxLength = 255): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw createHttpError.BadRequest(`${name} is required`);
  }
  if (value.length > maxLength) {
    throw createHttpError.BadRequest(`${name} is too long`);
  }
  return value;
}

/**
 * Populates req.loggedUser from the `accesstoken` header when it is valid.
 * Never throws: an invalid/expired token is treated as anonymous.
 */
export function authenticate(authService: AuthService): express.RequestHandler {
  return async (req, _res, next) => {
    try {
      const { accesstoken } = req.headers;
      if (typeof accesstoken === 'string' && accesstoken) {
        const user = await authService.getUserByAccessToken(accesstoken);
        if (user) req.loggedUser = user;
      }
    } catch {
      // invalid token: continue as anonymous
    }
    next();
  };
}

export const requireAuth: express.RequestHandler = (req, _res, next) => {
  if (!req.loggedUser) {
    next(createHttpError.Unauthorized('You must be logged in'));
    return;
  }
  next();
};

/**
 * Express 4 does not forward rejected promises to the error handler; this does.
 */
export function asyncHandler(
  handler: (req: express.Request, res: express.Response, next: express.NextFunction) => unknown,
): express.RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: express.ErrorRequestHandler = (err, req, res, _next) => {
  // body-parser errors (bad JSON, unsupported encodings from scanners, too large) carry a status
  const status: number =
    (createHttpError.isHttpError(err) && err.status) ||
    (typeof err?.status === 'number' && err.status) ||
    (typeof err?.statusCode === 'number' && err.statusCode) ||
    500;

  if (status >= 500) {
    console.error(`${req.method} ${req.originalUrl}`, err);
  }

  if (res.headersSent) return;

  const exposeMessage = status < 500 && typeof err?.message === 'string';
  res.status(status).json({
    status,
    message: exposeMessage ? err.message : 'Internal server error',
  });
};
