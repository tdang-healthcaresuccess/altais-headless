import { NextResponse } from 'next/server';
export function middleware(request) {
  const url = request.nextUrl;
  // Check if this is a preview request
  const isPreview = url.searchParams.get('preview') === 'true' || 
                   url.searchParams.has('code') ||
                   url.pathname === '/preview';
  // Logging for debugging
  console.log('[middleware] URL:', url.href);
  console.log('[middleware] isPreview:', isPreview);
  // Exclude _next, static, media, favicon, HubSpot, API paths, and preview requests from lowercasing
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/media') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/hubspot') ||
    url.pathname.startsWith('/hsforms') ||
    url.pathname.startsWith('/js.hsforms.net') ||
    isPreview
  ) {
    console.log('[middleware] Skipping lowercasing for:', url.pathname);
    return NextResponse.next();
  }
  const lowerPath = url.pathname.toLowerCase();
  if (url.pathname !== lowerPath) {
    url.pathname = lowerPath;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
