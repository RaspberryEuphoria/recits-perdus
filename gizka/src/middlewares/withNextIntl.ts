import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

/** @see https://next-intl-docs.vercel.app/docs/routing/middleware */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function withNextIntl(next: NextMiddleware) {
  const nextIntlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['fr'],
    // Used when no locale matches
    defaultLocale: 'fr',
    localePrefix: 'never',
  });

  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (
      ['api', '_next/static', '_next/image', 'favicon.ico'].some((path) =>
        pathname.startsWith(`/${path}`),
      )
    ) {
      return next(request, _next);
    }

    return nextIntlMiddleware(request);
  };
}
