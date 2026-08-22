import { NextResponse } from 'next/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale } from './i18n/config';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignore internal Next.js requests, APIs, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // matches favicon.ico, icon.svg, robots.txt, sitemap.xml, etc.
  ) {
    return NextResponse.next();
  }

  // ✅ NEW: Redirect root path to /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  // Check if pathname starts with a supported locale (e.g. /es, /it, /de)
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];

  let currentLocale = DEFAULT_LOCALE;
  if (maybeLocale && isValidLocale(maybeLocale)) {
    currentLocale = maybeLocale;
  }

  // Set x-locale header on the request for server components & root layout
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', currentLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
};