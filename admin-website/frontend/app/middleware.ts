import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Récupérer le cookie de session généré par Express lors du login
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  // Définir les routes protégées (ex: tout ce qui commence par /dashboard ou /workspace)
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // Si l'utilisateur essaie d'accéder à une route protégée sans token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); // Permet de rediriger après connexion
    return NextResponse.redirect(loginUrl);
  }

  // Si l'utilisateur est déjà connecté et tente d'aller sur /login
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurer les routes ciblées par le middleware
export const config = {
  matcher: ['/dashboard', '/blogs/:path*', 'portfolios/:path*', '/settings/:path*'],
};