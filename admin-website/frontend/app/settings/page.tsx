'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  User, 
  Tag, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Camera, 
  Save, 
  Lock, 
  Mail, 
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';

import { api } from '@/lib/api';

interface Category {
  id: number;
  name: string;
}

interface UserProfile {
  username: string;
  email: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'categories'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Référence pour le champ d'upload de photo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // État du profil utilisateur
  const [profile, setProfile] = useState<UserProfile>({name: 'Admin', email:'admin@example'});

  // Formulaire de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // État de la gestion des catégories
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Helper de feedback rapide
  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };
  
  // Chargement des données au montage via votre client API
  const fetchInitialData = async () => {
    setIsPageLoading(true);
    try {
      const [profileRes, categoriesRes] = await Promise.all([
        api.get('/users/profile'),
        api.get('/categories'),
      ]);

      setProfile(profileRes.data.user);
      setCategories(categoriesRes.data.categories);

    } catch {
      showFeedback('error', 'Impossible de charger les données depuis le serveur.');
    } finally {
      setIsPageLoading(false);
    }
  };

    useEffect(() => {
    fetchInitialData();
  }, [])

  // Handler Sauvegarde du Profil
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.put('/profile', profile);
      showFeedback('success', 'Profil mis à jour avec succès.');
    } catch {
      showFeedback('error', 'Erreur lors de la mise à jour du profil.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Mot de passe
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordForm.currentPassword) {
      showFeedback('error', 'Veuillez saisir votre mot de passe actuel.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showFeedback('error', 'Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showFeedback('error', 'Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    setIsLoading(true);
    try {
      await api.put('/profile/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showFeedback('success', 'Mot de passe modifié avec succès.');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Échec de la modification du mot de passe.';
      showFeedback('error', msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers Catégories
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const category = newCategoryName;
    if (!category) return;

    if (categories.some((c) => c.name.toLowerCase() === category.toLowerCase())) {
      showFeedback('error', 'Cette catégorie existe déjà.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/categories', { name: category });

      setNewCategoryName('');
      showFeedback('success', `Catégorie "${category}" ajoutée.`);
    } catch {
      showFeedback('error', "Impossible d'ajouter la catégorie.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer la catégorie "${name}" ?`)) return;

    setIsLoading(true);
    try {
      await api.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((c) => c.id !== id));
      showFeedback('success', `Catégorie "${name}" supprimée.`);
    } catch {
      showFeedback('error', 'Erreur lors de la suppression de la catégorie.');
    } finally {
      setIsLoading(false);
    }
  };

  // if (isPageLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0c1d23]">
  //       <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c1d23] text-gray-900 dark:text-gray-100 p-6 lg:p-8 transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Paramètres
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez votre profil utilisateur et les configurations de votre blog.
          </p>
        </div>

        {/* Message de notification / Toast */}
        {feedback && (
          <div
            className={`flex items-center gap-3 rounded-xl p-4 text-sm border shadow-sm transition ${
              feedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            )}
            <p className="font-medium">{feedback.message}</p>
          </div>
        )}

        {/* Navigation Onglets */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-semibold transition ${
                activeTab === 'profile'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <User className="h-4 w-4" />
              Profil utilisateur
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-semibold transition ${
                activeTab === 'categories'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Tag className="h-4 w-4" />
              Gestion des catégories
            </button>
          </nav>
        </div>

        {/* Onglet Profil */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            
            {/* Formulaire Informations personnelles */}
            <form onSubmit={handleSaveProfile} className="rounded-2xl bg-white dark:bg-[#12252e] p-6 shadow-sm border border-gray-100 dark:border-gray-800/80 space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-lg font-bold">Informations Personnelles</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mettez à jour votre photo et vos coordonnées publiques.</p>
              </div>

              {/* Photo de profil */}
              <div className="flex items-center gap-6">
                {/* <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-emerald-500/20 shrink-0">
                  <Image
                    src={profile.avatar || '/default-avatar.png'}
                    alt={profile.name || 'Avatar'}
                    fill
                    unoptimized
                    sizes="80px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100 transition"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div> */}
                {/* <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Changer de photo
                  </button>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">JPG, PNG ou GIF. Max 2MB.</p>
                </div> */}
              </div>

              {/* Champs Profil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {"Nom d'utilisateur"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={profile?.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Adresse E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={profile?.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Enregistrer les modifications
                </button>
              </div>
            </form>

            {/* Formulaire Mot de passe */}
            <form onSubmit={handleUpdatePassword} className="rounded-2xl bg-white dark:bg-[#12252e] p-6 shadow-sm border border-gray-100 dark:border-gray-800/80 space-y-6">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-lg font-bold">Mot de Passe & Sécurité</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Assurez-vous d&apos;utiliser un mot de passe robuste.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>

          </div>
        )}

        {/* Onglet Gestion de Catégorie */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            
            {/* Formulaire d'ajout */}
            <div className="rounded-2xl bg-white dark:bg-[#12252e] p-6 shadow-sm border border-gray-100 dark:border-gray-800/80">
              <h2 className="text-lg font-bold mb-1">Ajouter une nouvelle catégorie</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Les catégories permettent d&apos;organiser les articles publiés sur le site.
              </p>

              <form onSubmit={handleAddCategory} className="flex gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom de la catégorie (ex: Écologie)"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0c1d23] pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition shrink-0 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter
                </button>
              </form>
            </div>

            {/* Liste des catégories */}
            <div className="rounded-2xl bg-white dark:bg-[#12252e] shadow-sm border border-gray-100 dark:border-gray-800/80 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold">Catégories existantes</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {categories.length} catégorie(s) disponible(s)
                </p>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {categories.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Aucune catégorie enregistrée.
                  </div>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition"
                    >
                      <>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-sm">
                              {cat.name}
                            </span>
                            {/* <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {0} article(s)
                            </span> */}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}