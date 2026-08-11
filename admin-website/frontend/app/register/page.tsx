'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';
import { api } from '@/lib/api';
import Logo from '@/public/logo.png';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Envoi des données vers le backend
      await api.post('/register', formData);
      setSuccessMessage('Compte créé avec succès ! Redirection...');
      
      // Réinitialisation du formulaire
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } catch (err: any) {
      console.error('Erreur lors de l inscription:', err);
      setErrorMessage(
        err.response?.data?.message || 'Une erreur est survenue lors de la création du compte.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#10b481]/30 p-0.5 shadow-sm">
            <Image 
              src={Logo} 
              alt="Logo Smartsaha" 
              fill
              sizes="56px"
              className="rounded-full object-cover" 
            />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Créer un compte
        </h1>
        <p className="text-center mt-1 text-xs font-medium text-gray-500">
          Rejoignez-nous en remplissant les informations ci-dessous
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          
          {/* Notifications */}
          {errorMessage && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 rounded-xl bg-green-50 p-4 text-sm text-green-700 border border-green-100">
              {successMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Nom d'utilisateur (Username) */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-gray-700 mb-1.5">
                {"Nom d'utilisateur"}
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="jdupont"
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#10b481] focus:outline-none focus:ring-2 focus:ring-[#10b481]/20 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Adresse e-mail
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@example.com"
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#10b481] focus:outline-none focus:ring-2 focus:ring-[#10b481]/20 transition"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#10b481] focus:outline-none focus:ring-2 focus:ring-[#10b481]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b481] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e9b6e] focus:outline-none focus:ring-2 focus:ring-[#10b481] focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    {"S'inscrire"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Lien vers la connexion */}
          <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-100 pt-5">
            <span className="text-gray-500">Vous avez déjà un compte ? </span>
            <Link 
              href="/" 
              className="font-semibold text-[#10b481] hover:underline"
            >
              Se connecter
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}