'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const pathname = usePathname();
  const { logout } = useAuth();

  const navLinks = [
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Portfolio', href: '/portfolios' },
    { name: 'Paramètres', href: '/settings' },
  ];

  // Liste des routes où le Header ne doit PAS s'afficher
  const routesSansHeader = ['/', '/register', '/forgot-password'];

  if (routesSansHeader.includes(pathname)) {
    return null;
  }

  // Déclencher la déconnexion
  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch {
      // Gestion d'erreur silencieuse ou notification si nécessaire
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image 
              src={Logo} 
              alt="logo" 
              className="rounded-full object-cover border-2 border-[#10b481] size-12"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Espace<span className="text-[#10b481]"> Admin</span>
              </span>
              <span className="text-xs font-medium text-gray-500">
                Site web de Smartsaha
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'font-semibold text-[#10b481]'
                      : 'text-gray-600 hover:text-[#10b481]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Bouton Déconnexion Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>

          {/* Bouton Menu Mobile (Hamburger) */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Rétractable */}
        {isMenuOpen && (
          <div className="border-b border-gray-200 bg-white px-4 pb-6 pt-2 md:hidden">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#10b481]/10 font-semibold text-[#10b481]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#10b481]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal de Confirmation de Déconnexion */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
            
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Confirmation de déconnexion
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Êtes-vous sûr de vouloir vous déconnecter ?
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition focus:outline-none cursor-pointer disabled:opacity-50"
              >
                Annuler
              </button>
              
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleConfirmLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  'Oui, me déconnecter'
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}