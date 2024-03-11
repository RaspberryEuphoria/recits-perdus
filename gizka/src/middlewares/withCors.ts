import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedOrigins: [`http://${process.env.NEXT_PUBLIC_BFF_PREFIX_HOSTNAME}`],
  allowedHeaders: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization',
  ],
  credentials: true,
};

/** @see https://codingwithmanny.medium.com/3-ways-to-configure-cors-for-nextjs-13-app-router-api-route-handlers-427e10929818 */
export function withCors(next: NextMiddleware) {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/api/socket')) {
      return next(request, _next);
    }

    // Always allow preflight requests, so the browser can check if the actual request is allowed
    if (request.method === 'OPTIONS') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (pathname.startsWith('/api')) {
      const response = NextResponse.next();
      const origin = request.headers.get('origin') ?? '';

      if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }

      response.headers.set('Access-Control-Allow-Credentials', corsOptions.credentials.toString());
      response.headers.set('Access-Control-Allow-Methods', corsOptions.allowedMethods.join(','));
      response.headers.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));

      return response;
    }

    return next(request, _next);
  };
}
