import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  
  // Enhanced preview detection
  const isPreview = url.searchParams.get('preview') === 'true' || 
                   url.searchParams.has('code') ||
                   url.searchParams.has('p') ||
                   url.pathname === '/preview' ||
                   url.pathname.startsWith('/preview/');
  
  // Logging for debugging
  console.log('[middleware] URL:', url.href);
  console.log('[middleware] isPreview:', isPreview);
  console.log('[middleware] Search params:', Object.fromEntries(url.searchParams));
  
  // For preview URLs, prevent any redirects and pass through directly
  if (isPreview) {
    console.log('[middleware] Preview URL detected - bypassing all redirects');
    // Set special headers to prevent caching of preview content
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('X-Preview-Mode', 'active');
    return response;
  }
  
  // Exclude _next, static, media, favicon, HubSpot, API paths from lowercasing
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
    console.log('[middleware] Skipping lowercasing for:', url.pathname);
    return NextResponse.next();
  }

  // Handle lowercase redirects for non-preview URLs
  const lowerPath = url.pathname.toLowerCase();
  if (url.pathname !== lowerPath) {
    url.pathname = lowerPath;
    console.log('[middleware] Redirecting to lowercase:', url.href);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
