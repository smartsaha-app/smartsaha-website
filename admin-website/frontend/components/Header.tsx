'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, AlertTriangle, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Portfolio', href: '/portfolios' },
    { name: 'Paramètres', href: '/settings' },
  ];

  const username = user?.username;
  const email = user?.email;
  const initial = username?.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const routesSansHeader = ['/', '/register', '/forgot-password'];

  if (routesSansHeader.includes(pathname)) {
    return null;
  }

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch {
      // Erreur silencieuse
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
              className="size-12 rounded-full border-2 border-[#10b481] object-cover"
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

          {/* Menu Profil / Dropdown Desktop */}
          <div className="relative hidden items-center gap-4 md:flex" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex cursor-pointer items-center gap-3 rounded-full border border-gray-200 p-1.5 pr-3 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#10b481]/20"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10b481] font-bold text-white shadow-sm">
                {initial}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-gray-900">
                  {username}
                </span>
                <span className="max-w-[140px] truncate text-xs text-gray-500">
                  {email}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menu Déroulant */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 animate-in fade-in slide-in-from-top-2 duration-150 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                {/* En-tête de la carte dropdown */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-3 py-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10b481] font-bold text-white shadow-sm">
                    {initial}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold leading-tight text-gray-900">
                      {username}
                    </span>
                    <span className="max-w-[140px] truncate text-xs text-gray-500">
                      {email}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-1">
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#10b481]"
                  >
                    <Settings className="h-4 w-4 text-gray-500" />
                    Paramètres
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
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
            {/* Infos Utilisateur sur Mobile */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 pt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10b481] font-bold text-white shadow-sm">
                {initial}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{username}</span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pt-3">
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
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">

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
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleConfirmLogout}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
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