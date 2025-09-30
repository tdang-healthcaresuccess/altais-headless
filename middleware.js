import { NextResponse } from 'next/server';
export function middleware(request) {
  const url = request.nextUrl;
  // Exclude _next, static, media, favicon, HubSpot, and API paths from lowercasing
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/media') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/hubspot') ||
    url.pathname.startsWith('/hsforms') ||
    url.pathname.startsWith('/js.hsforms.net')
  ) {
    return NextResponse.next();
  }
  const lowerPath = url.pathname.toLowerCase();
  if (url.pathname !== lowerPath) {
    url.pathname = lowerPath;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
