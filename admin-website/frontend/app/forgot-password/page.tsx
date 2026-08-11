'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  KeyRound, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Envoi de la requête de réinitialisation vers l'API
      await api.post('/forgot-password', { email });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Erreur lors de la demande de réinitialisation:', err);
      setErrorMessage(
        err.response?.data?.message || 
        'Impossible d\'envoyer le lien de réinitialisation. Veuillez vérifier l\'adresse email.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/30">
            <KeyRound className="h-6 w-6" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Mot de passe oublié ?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSubmitted 
            ? 'Vérifiez votre boîte de réception' 
            : 'Entrez votre adresse e-mail pour recevoir un lien de réinitialisation'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10">
          
          {/* Écran de confirmation après envoi */}
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex flex-col items-center gap-3">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
                <p className="text-sm text-gray-700">
                  Un e-mail contenant les instructions de réinitialisation a été envoyé à <br />
                  <span className="font-semibold text-gray-900">{email}</span>.
                </p>
              </div>

              <p className="text-xs text-gray-500">
                {"Vous n'avez pas reçu l'e-mail ? Vérifiez vos spams ou réessayez."}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  Renvoyer un e-mail
                </button>

                <Link
                  href="/login"
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-green-600 hover:text-green-700 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            /* Formulaire de saisie d'email */
            <>
              {errorMessage && (
                <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                  {errorMessage}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@example.com"
                      className="block w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le lien'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}