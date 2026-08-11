'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '@/public/logo.png';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, UserCheck, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Connexion centralisée via AuthContext (payload: username, password)
      await login(username, password);

      // Redirection vers le tableau de bord une fois la session établie
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const errorResponse = (err as { response?: { data?: { message?: string } } }).response;
        setErrorMessage(
          errorResponse?.data?.message || 'Identifiants invalides. Veuillez réessayer.'
        );
      } else {
        setErrorMessage('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        
        {/* En-tête avec Logo centré */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#10b481]/30 p-0.5 shadow-sm">
            <Image 
              src={Logo} 
              alt="Logo Smartsaha" 
              fill
              sizes="56px"
              className="rounded-full object-cover" 
            />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Espace <span className="text-[#10b481]">Admin</span>
          </h1>
          <p className="mt-1 text-xs font-medium text-gray-500">
            Site web de Smartsaha
          </p>
        </div>

        {/* Alerte d'erreur */}
        {errorMessage && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Champ Identifiant / Nom d'utilisateur */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Utilisateur
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#10b481] focus:outline-none focus:ring-2 focus:ring-[#10b481]/20 transition"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold text-gray-700"
              >
                Mot de passe
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-medium text-[#10b481] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#10b481] focus:outline-none focus:ring-2 focus:ring-[#10b481]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Bouton Soumettre */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b481] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e9b6e] focus:outline-none focus:ring-2 focus:ring-[#10b481] focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                Se connecter
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Pied de carte */}
        <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-100 pt-5">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-semibold text-[#10b481] hover:underline">
            {"S'inscrire"}
          </Link>
        </div>

      </div>
    </div>
  );
}