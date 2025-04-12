import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware will run on every request
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define paths that are considered public (accessible without authentication)
  const isPublicPath = path === '/login';
  
  // Check if user is authenticated by looking for a session token
  // In a real application, you would validate this token properly
  const isAuthenticated = request.cookies.has('auth_session');

  // Redirect authenticated users trying to access login page
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};