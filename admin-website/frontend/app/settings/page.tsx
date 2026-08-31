'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Tag,
  Plus,
  Trash2,
  Check,
  Save,
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  X,
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

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'categories'
  >('profile');

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // ============================================================
  // PROFIL
  // ============================================================

  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
  });

  // ============================================================
  // MOT DE PASSE
  // ============================================================

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // ============================================================
  // CATÉGORIES
  // ============================================================

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // ============================================================
  // MODAL SUPPRESSION
  // ============================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] =
    useState<Category | null>(null);

  // ============================================================
  // FEEDBACK
  // ============================================================

  const showFeedback = (
    type: 'success' | 'error',
    message: string
  ) => {
    setFeedback({
      type,
      message,
    });

    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // ============================================================
  // CHARGEMENT INITIAL
  // ============================================================

  const fetchInitialData = async () => {
    setIsPageLoading(true);

    try {
      const [profileRes, categoriesRes] = await Promise.all([
        api.get('/users/profile'),
        api.get('/categories'),
      ]);

      setProfile(profileRes.data.user);

      setCategories(
        categoriesRes.data.categories || []
      );
    } catch (error) {
      console.error(
        'Erreur chargement données :',
        error
      );

      showFeedback(
        'error',
        'Impossible de charger les données depuis le serveur.'
      );
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // ============================================================
  // MISE À JOUR DU PROFIL
  // ============================================================

  const handleSaveProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await api.put(
        '/users/profile',
        profile
      );

      setProfile(response.data.user);

      showFeedback(
        'success',
        response.data?.message ||
          'Profil mis à jour avec succès.'
      );
    } catch (error: any) {
      console.error(
        'Erreur mise à jour profil :',
        error
      );

      const message =
        error?.response?.data?.message ||
        'Erreur lors de la mise à jour du profil.';

      showFeedback('error', message);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // MISE À JOUR DU MOT DE PASSE
  // ============================================================

  const handleUpdatePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(
      '🔥 handleUpdatePassword appelé'
    );

    console.log(
      'passwordForm :',
      passwordForm
    );

    // Vérification mot de passe actuel
    if (!passwordForm.currentPassword) {
      showFeedback(
        'error',
        'Veuillez saisir votre mot de passe actuel.'
      );

      return;
    }

    // Vérification nouveau mot de passe
    if (passwordForm.newPassword.length < 6) {
      showFeedback(
        'error',
        'Le nouveau mot de passe doit contenir au moins 6 caractères.'
      );

      return;
    }

    // Vérification confirmation
    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      showFeedback(
        'error',
        'Les nouveaux mots de passe ne correspondent pas.'
      );

      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 Envoi API');

      const response = await api.put(
        '/users/profile/password',
        {
          currentPassword:
            passwordForm.currentPassword,

          newPassword:
            passwordForm.newPassword,
        }
      );

      console.log(
        '✅ Réponse :',
        response.data
      );

      // Réinitialiser le formulaire
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      showFeedback(
        'success',
        response.data?.message ||
          'Mot de passe modifié avec succès.'
      );
    } catch (error: any) {
      console.error(
        '❌ Erreur modification mot de passe :',
        error
      );

      console.error(
        '❌ Response :',
        error?.response?.data
      );

      const message =
        error?.response?.data?.message ||
        'Échec de la modification du mot de passe.';

      showFeedback(
        'error',
        message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // AJOUT CATÉGORIE
  // ============================================================

  const handleAddCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const category =
      newCategoryName.trim();

    if (!category) {
      showFeedback(
        'error',
        'Veuillez saisir un nom de catégorie.'
      );

      return;
    }

    // Vérifier doublon
    const alreadyExists = categories.some(
      (c) =>
        c.name.toLowerCase() ===
        category.toLowerCase()
    );

    if (alreadyExists) {
      showFeedback(
        'error',
        'Cette catégorie existe déjà.'
      );

      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
        '/categories',
        {
          name: category,
        }
      );

      // Si l'API retourne la catégorie créée
      if (response.data?.category) {
        setCategories((prev) => [
          ...prev,
          response.data.category,
        ]);
      } else {
        // Sinon on recharge
        const categoriesRes =
          await api.get('/categories');

        setCategories(
          categoriesRes.data.categories || []
        );
      }

      setNewCategoryName('');

      showFeedback(
        'success',
        response.data?.message ||
          `Catégorie "${category}" ajoutée avec succès.`
      );
    } catch (error: any) {
      console.error(
        'Erreur ajout catégorie :',
        error
      );

      const message =
        error?.response?.data?.message ||
        "Impossible d'ajouter la catégorie.";

      showFeedback(
        'error',
        message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // OUVRIR MODAL SUPPRESSION
  // ============================================================

  const handleDeleteCategory = (
    id: number,
    name: string
  ) => {
    setCategoryToDelete({
      id,
      name,
    });

    setIsDeleteModalOpen(true);
  };

  // ============================================================
  // ANNULER SUPPRESSION
  // ============================================================

  const cancelDeleteCategory = () => {
    if (isLoading) return;

    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  // ============================================================
  // CONFIRMER SUPPRESSION
  // ============================================================

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.delete(
        `/categories/${categoryToDelete.id}`
      );

      // Supprimer immédiatement de l'interface
      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !==
            categoryToDelete.id
        )
      );

      const deletedCategoryName =
        categoryToDelete.name;

      // Fermer le modal
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);

      // Message succès
      showFeedback(
        'success',
        response.data?.message ||
          `Catégorie "${deletedCategoryName}" supprimée avec succès.`
      );
    } catch (error: any) {
      console.error(
        'Erreur suppression catégorie :',
        error
      );

      const message =
        error?.response?.data?.message ||
        `Erreur lors de la suppression de la catégorie "${categoryToDelete.name}".`;

      // Fermer le modal
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);

      showFeedback(
        'error',
        message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c1d23] text-gray-900 dark:text-gray-100 p-6 lg:p-8 transition-colors duration-300">

      <div className="mx-auto max-w-5xl space-y-6">

        {/* =====================================================
            EN-TÊTE
        ====================================================== */}

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Paramètres
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez votre profil utilisateur et les configurations de votre blog.
          </p>
        </div>

        {/* =====================================================
            FEEDBACK
        ====================================================== */}

        {feedback && (
          <div
            className={`flex items-center gap-3 rounded-xl border p-4 text-sm shadow-sm transition ${
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

            <p className="font-medium">
              {feedback.message}
            </p>
          </div>
        )}

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <div className="border-b border-gray-200 dark:border-gray-800">

          <nav
            className="-mb-px flex space-x-8"
            aria-label="Tabs"
          >

            <button
              type="button"
              onClick={() =>
                setActiveTab('profile')
              }
              className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition ${
                activeTab === 'profile'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <User className="h-4 w-4" />

              Profil utilisateur
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab('categories')
              }
              className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-semibold transition ${
                activeTab === 'categories'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Tag className="h-4 w-4" />

              Gestion des catégories
            </button>

          </nav>
        </div>

        {/* =====================================================
            ONGLET PROFIL
        ====================================================== */}

        {activeTab === 'profile' && (
          <div className="space-y-6">

            {/* =================================================
                INFORMATIONS PERSONNELLES
            ================================================== */}

            <form
              onSubmit={handleSaveProfile}
              className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800/80 dark:bg-[#12252e]"
            >

              <div className="border-b border-gray-100 pb-4 dark:border-gray-800">

                <h2 className="text-lg font-bold">
                  Informations Personnelles
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mettez à jour vos informations personnelles.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Username */}

                <div>

                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Nom d'utilisateur
                  </label>

                  <div className="relative">

                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      value={
                        profile.username
                      }
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          username:
                            e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Adresse E-mail
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      value={
                        profile.email
                      }
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email:
                            e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                    />

                  </div>

                </div>

              </div>

              <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                >

                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}

                  Enregistrer les modifications

                </button>

              </div>

            </form>

            {/* =================================================
                MOT DE PASSE
            ================================================== */}

            <form
              onSubmit={handleUpdatePassword}
              className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800/80 dark:bg-[#12252e]"
            >

              <div className="border-b border-gray-100 pb-4 dark:border-gray-800">

                <h2 className="text-lg font-bold">
                  Mot de Passe & Sécurité
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Assurez-vous d'utiliser un mot de passe robuste.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Current password */}

                <div>

                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Mot de passe actuel
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="password"
                      placeholder="••••••••"
                      value={
                        passwordForm.currentPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                    />

                  </div>

                </div>

                {/* New password */}

                <div>

                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Nouveau mot de passe
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="password"
                      placeholder="••••••••"
                      value={
                        passwordForm.newPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                    />

                  </div>

                </div>

                {/* Confirm password */}

                <div>

                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Confirmer le mot de passe
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="password"
                      placeholder="••••••••"
                      value={
                        passwordForm.confirmPassword
                      }
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                    />

                  </div>

                </div>

              </div>

              <div className="flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
                >

                  {isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  Mettre à jour le mot de passe

                </button>

              </div>

            </form>

          </div>
        )}

        {/* =====================================================
            ONGLET CATÉGORIES
        ====================================================== */}

        {activeTab === 'categories' && (
          <div className="space-y-6">

            {/* =================================================
                AJOUT CATÉGORIE
            ================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800/80 dark:bg-[#12252e]">

              <h2 className="mb-1 text-lg font-bold">
                Ajouter une nouvelle catégorie
              </h2>

              <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                Les catégories permettent d'organiser les articles publiés sur le site.
              </p>

              <form
                onSubmit={handleAddCategory}
                className="flex max-w-lg gap-3"
              >

                <div className="relative flex-1">

                  <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={
                      newCategoryName
                    }
                    onChange={(e) =>
                      setNewCategoryName(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-[#0c1d23] dark:text-gray-100"
                  />

                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
                >

                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}

                  Ajouter

                </button>

              </form>

            </div>

            {/* =================================================
                LISTE CATÉGORIES
            ================================================== */}

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800/80 dark:bg-[#12252e]">

              <div className="border-b border-gray-100 p-6 dark:border-gray-800">

                <h2 className="text-lg font-bold">
                  Catégories existantes
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {categories.length}{' '}
                  catégorie(s) disponible(s)
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
                      className="flex items-center justify-between p-4 px-6 transition hover:bg-gray-50/80 dark:hover:bg-gray-800/30"
                    >

                      <div>

                        <span className="text-sm font-semibold">
                          {cat.name}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCategory(
                            cat.id,
                            cat.name
                          )
                        }
                        disabled={isLoading}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/40"
                        title="Supprimer"
                      >

                        <Trash2 className="h-4 w-4" />

                      </button>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>
        )}

      </div>

      {/* =======================================================
          MODAL CONFIRMATION SUPPRESSION
      ======================================================== */}

      {isDeleteModalOpen &&
        categoryToDelete && (

          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={cancelDeleteCategory}
          >

            <div
              className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-[#12252e]"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* Header */}

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">

                    <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />

                  </div>

                  <div>

                    <h2 className="text-lg font-bold">
                      Supprimer la catégorie ?
                    </h2>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Confirmation requise
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={cancelDeleteCategory}
                  disabled={isLoading}
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >

                  <X className="h-5 w-5" />

                </button>

              </div>

              {/* Message */}

              <div className="mt-5">

                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">

                  Voulez-vous vraiment supprimer la
                  catégorie{' '}

                  <span className="font-bold text-gray-900 dark:text-white">
                    "{categoryToDelete.name}"
                  </span>

                  {' '}?

                </p>

                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/30">

                  <div className="flex gap-2">

                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />

                    <p className="text-xs text-red-700 dark:text-red-300">
                      Cette action est irréversible.
                      La catégorie sera définitivement
                      supprimée.
                    </p>

                  </div>

                </div>

              </div>

              {/* Actions */}

              <div className="mt-6 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={cancelDeleteCategory}
                  disabled={isLoading}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={confirmDeleteCategory}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {isLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  {isLoading
                    ? 'Suppression...'
                    : 'Supprimer'}

                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}
