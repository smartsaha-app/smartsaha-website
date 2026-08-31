'use client';

import { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LayoutGrid,
  List,
  Loader2,
  AlertCircle,
  X,
  Upload,
  Images,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { api } from '@/lib/api';

interface Portfolio {
  id: number;
  title: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  cover_image?: string;
  gallery?: string[] | string;
  technologies?: string[] | string;
  key_features?: string[] | string;
  createdAt?: string;
  updatedAt?: string;
  user_id?: number;
}

type AlertType = 'success' | 'error' | 'warning' | null;

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // =====================================================
  // ALERT MODAL
  // =====================================================

  const [alertType, setAlertType] = useState<AlertType>(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (
    type: Exclude<AlertType, null>,
    title: string,
    message: string
  ) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertType(null);
    setAlertTitle('');
    setAlertMessage('');
  };

  // =====================================================
  // GALERIE
  // =====================================================

  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(
    null
  );

  // =====================================================
  // MODAL AJOUT
  // =====================================================

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  // =====================================================
  // MODAL MODIFICATION
  // =====================================================

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Portfolio | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editTechnologies, setEditTechnologies] = useState('');
  const [editChallenge, setEditChallenge] = useState('');
  const [editSolution, setEditSolution] = useState('');
  const [editCoverImageFile, setEditCoverImageFile] =
    useState<File | null>(null);
  const [editGalleryFiles, setEditGalleryFiles] = useState<File[]>([]);

  // =====================================================
  // MODAL SUPPRESSION
  // =====================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] =
    useState<Portfolio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // =====================================================
  // CHARGEMENT
  // =====================================================

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/portfolios');

      setProjects(response.data.portfolios || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Impossible de charger les données';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PARSERS
  // =====================================================

  const parseGallery = (
    gallery?: string[] | string
  ): string[] => {
    if (!gallery) return [];

    if (Array.isArray(gallery)) {
      return gallery;
    }

    if (typeof gallery === 'string') {
      try {
        const parsed = JSON.parse(gallery);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        return gallery
          .split(',')
          .map((img) => img.trim())
          .filter(Boolean);
      }
    }

    return [];
  };

  const parseTechnologies = (
    techs?: string[] | string
  ): string[] => {
    if (!techs) return [];

    if (Array.isArray(techs)) {
      return techs;
    }

    if (typeof techs === 'string') {
      return techs
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    return [];
  };

  // =====================================================
  // FORMULAIRE AJOUT
  // =====================================================

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setTechnologies('');
    setChallenge('');
    setSolution('');
    setCoverImageFile(null);
    setGalleryFiles([]);
    setFormError(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    resetForm();
  };

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Le titre est obligatoire.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);

      const formData = new FormData();

      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('technologies', technologies);
      formData.append('challenge', challenge);
      formData.append('solution', solution);

      if (coverImageFile) {
        formData.append('cover_image', coverImageFile);
      }

      if (galleryFiles.length > 0) {
        galleryFiles.forEach((file) => {
          formData.append('gallery', file);
        });
      }

      const response = await api.post('/portfolios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newProject =
        response.data.portfolio || response.data;

      if (newProject) {
        setProjects((prev) => [newProject, ...prev]);
      } else {
        await fetchPortfolios();
      }

      setIsModalOpen(false);
      resetForm();

      showAlert(
        'success',
        'Projet ajouté',
        'Le projet a été ajouté avec succès à votre portfolio.'
      );
    } catch (err: any) {
      console.error('Erreur création projet:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Erreur lors de la création du projet';

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // MODIFICATION
  // =====================================================

  const handleOpenEditModal = (project: Portfolio) => {
    setEditingProject(project);

    setEditTitle(project.title || '');
    setEditSummary(project.summary || '');

    setEditTechnologies(
      parseTechnologies(project.technologies).join(', ')
    );

    setEditChallenge(project.challenge || '');
    setEditSolution(project.solution || '');

    setEditCoverImageFile(null);
    setEditGalleryFiles([]);
    setEditError(null);

    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    if (isUpdating) return;

    setIsEditModalOpen(false);
    setEditingProject(null);

    setEditTitle('');
    setEditSummary('');
    setEditTechnologies('');
    setEditChallenge('');
    setEditSolution('');

    setEditCoverImageFile(null);
    setEditGalleryFiles([]);
    setEditError(null);
  };

  const handleUpdateProject = async (e: FormEvent) => {
    e.preventDefault();

    if (!editingProject) return;

    if (!editTitle.trim()) {
      setEditError('Le titre est obligatoire.');
      return;
    }

    try {
      setIsUpdating(true);
      setEditError(null);

      const formData = new FormData();

      formData.append('title', editTitle);
      formData.append('summary', editSummary);
      formData.append('technologies', editTechnologies);
      formData.append('challenge', editChallenge);
      formData.append('solution', editSolution);

      if (editCoverImageFile) {
        formData.append('cover_image', editCoverImageFile);
      }

      if (editGalleryFiles.length > 0) {
        editGalleryFiles.forEach((file) => {
          formData.append('gallery', file);
        });
      }

      const response = await api.put(
        `/portfolios/${editingProject.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedProject =
        response.data.portfolio || response.data;

      if (updatedProject) {
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject.id
              ? updatedProject
              : project
          )
        );
      } else {
        await fetchPortfolios();
      }

      setIsEditModalOpen(false);
      setEditingProject(null);

      showAlert(
        'success',
        'Projet modifié',
        'Les modifications ont été enregistrées avec succès.'
      );
    } catch (err: any) {
      console.error('Erreur modification projet:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Erreur lors de la modification du projet';

      setEditError(message);
    } finally {
      setIsUpdating(false);
    }
  };

  // =====================================================
  // SUPPRESSION
  // =====================================================

  const handleOpenDeleteModal = (project: Portfolio) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;

    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setIsDeleting(true);

      await api.delete(
        `/portfolios/${projectToDelete.id}`
      );

      setProjects((prev) =>
        prev.filter(
          (project) => project.id !== projectToDelete.id
        )
      );

      setIsDeleteModalOpen(false);
      setProjectToDelete(null);

      showAlert(
        'success',
        'Projet supprimé',
        'Le projet a été supprimé définitivement.'
      );
    } catch (err: any) {
      console.error('Erreur suppression projet:', err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Une erreur est survenue lors de la suppression.';

      setIsDeleteModalOpen(false);
      setProjectToDelete(null);

      showAlert(
        'error',
        'Erreur de suppression',
        message
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // =====================================================
  // FILTRAGE
  // =====================================================

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();

    const titleMatch = project.title
      ? project.title.toLowerCase().includes(term)
      : false;

    const summaryMatch = project.summary
      ? project.summary.toLowerCase().includes(term)
      : false;

    return titleMatch || summaryMatch;
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* =====================================================
            EN-TÊTE
        ===================================================== */}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Gestion du Portfolio
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Gérez vos réalisations, projets clients et études de
            cas à présenter sur le site.
          </p>
        </div>

        {/* =====================================================
            BARRE OUTILS
        ===================================================== */}

        <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">

          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher par titre ou résumé..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">

            {/* VUE */}
            <div className="flex items-center rounded-xl bg-gray-100 p-1">

              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Vue liste"
              >
                <List className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Tableau
                </span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Vue grille"
              >
                <LayoutGrid className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Grille
                </span>
              </button>
            </div>

            {/* AJOUT */}
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un projet
            </button>
          </div>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 shadow-sm">
            <Loader2 className="mb-2 h-8 w-8 animate-spin text-green-600" />

            <p className="text-sm text-gray-500">
              Chargement des réalisations...
            </p>
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">

            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />

            <div className="flex-1 text-sm">
              {error}
            </div>

            <button
              type="button"
              onClick={fetchPortfolios}
              className="text-xs font-semibold underline hover:no-underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading &&
          !error &&
          filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
              <p className="text-sm text-gray-500">
                Aucun projet trouvé.
              </p>
            </div>
          )}

        {/* =====================================================
            GRILLE
        ===================================================== */}

        {!loading &&
          !error &&
          viewMode === 'grid' &&
          filteredProjects.length > 0 && (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProjects.map((project) => {
                const techs = parseTechnologies(
                  project.technologies
                );

                const galleryImages = parseGallery(
                  project.gallery
                );

                return (
                  <div
                    key={project.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                  >

                    <div>
                      {/* IMAGE */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">

                        {project.cover_image ? (
                          <Image
                            src={project.cover_image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            Sans image
                          </div>
                        )}

                        {galleryImages.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedGallery(
                                galleryImages
                              )
                            }
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-medium text-white shadow backdrop-blur-md transition hover:bg-black/80"
                          >
                            <Images className="h-3.5 w-3.5" />

                            <span>
                              {galleryImages.length}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* CONTENU */}
                      <div className="space-y-3 p-5">

                        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                          {project.title}
                        </h3>

                        {project.summary && (
                          <p className="line-clamp-2 text-xs text-gray-500">
                            {project.summary}
                          </p>
                        )}

                        {techs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {techs.map(
                              (tech, index) => (
                                <span
                                  key={`${project.id}-tech-${index}`}
                                  className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-end border-t border-gray-100 bg-gray-50/50 px-5 py-3">

                      <div className="flex items-center gap-1">

                        {/* SUPPRIMER */}
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenDeleteModal(
                              project
                            )
                          }
                          className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                          title="Supprimer"
                        >
                          <div className="flex items-center">
                            <Trash2 className="mx-2 h-4 w-4" />

                            <span className="text-sm">
                              Supprimer
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* =====================================================
            TABLEAU
        ===================================================== */}

        {!loading &&
          !error &&
          viewMode === 'table' &&
          filteredProjects.length > 0 && (

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">

                    <tr>
                      <th className="px-6 py-4">
                        Titre
                      </th>

                      <th className="px-6 py-4">
                        Résumé
                      </th>

                      <th className="px-6 py-4">
                        Galerie
                      </th>

                      <th className="px-6 py-4">
                        Technologies
                      </th>

                      <th className="px-6 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 text-gray-700">

                    {filteredProjects.map(
                      (project) => {
                        const techs =
                          parseTechnologies(
                            project.technologies
                          );

                        const galleryImages =
                          parseGallery(
                            project.gallery
                          );

                        return (
                          <tr
                            key={project.id}
                            className="transition-colors hover:bg-gray-50/80"
                          >

                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                              {project.title}
                            </td>

                            <td className="max-w-xs truncate px-6 py-4 text-xs text-gray-500">
                              {project.summary || '-'}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">

                              {galleryImages.length > 0 ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedGallery(
                                      galleryImages
                                    )
                                  }
                                  className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:underline"
                                >
                                  <Images className="h-3.5 w-3.5" />

                                  {galleryImages.length}{' '}
                                  image(s)
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  Aucune
                                </span>
                              )}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">

                                {techs.map(
                                  (t, index) => (
                                    <span
                                      key={`${project.id}-tbl-tech-${index}`}
                                      className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600"
                                    >
                                      {t}
                                    </span>
                                  )
                                )}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-right">

                              <div className="flex items-center justify-end gap-1">
                                {/* SUPPRIMER */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenDeleteModal(
                                      project
                                    )
                                  }
                                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                  title="Supprimer"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>

      {/* =====================================================
          MODAL GALERIE
      ===================================================== */}

      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="relative max-h-[85vh] w-full max-w-4xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">

              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Images className="h-5 w-5 text-green-600" />

                Galerie de projet (
                {selectedGallery.length})
              </h3>

              <button
                type="button"
                onClick={() =>
                  setSelectedGallery(null)
                }
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3">

              {selectedGallery.map(
                (imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative h-48 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-100"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Image galerie ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-200 hover:scale-105"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL AJOUT
      ===================================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">

              <h2 className="text-xl font-bold text-gray-900">
                Nouveau Projet Portfolio
              </h2>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />

                <span>{formError}</span>
              </div>
            )}

            <form
              onSubmit={handleCreateProject}
              className="space-y-4"
            >

              {/* TITRE */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Titre du projet{' '}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  required
                  placeholder="Ex: Bosy - Plateforme de formation"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* RESUME */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Résumé court
                </label>

                <textarea
                  rows={2}
                  placeholder="Brève description de la réalisation..."
                  value={summary}
                  onChange={(e) =>
                    setSummary(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Technologies (séparées par des virgules)
                </label>

                <input
                  type="text"
                  placeholder="Ex: Next.js, Tailwind CSS, FastAPI, PostgreSQL"
                  value={technologies}
                  onChange={(e) =>
                    setTechnologies(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* CHALLENGE / SOLUTION */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Défi / Problème
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Quels problèmes devaient être résolus ?"
                    value={challenge}
                    onChange={(e) =>
                      setChallenge(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Solution apportée
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Comment le projet répond-il au besoin ?"
                    value={solution}
                    onChange={(e) =>
                      setSolution(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>

              {/* IMAGES */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* COVER */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Image de couverture
                  </label>

                  <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100">

                    <Upload className="h-4 w-4 shrink-0 text-gray-500" />

                    <span className="truncate">
                      {coverImageFile
                        ? coverImageFile.name
                        : 'Image principale'}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setCoverImageFile(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                {/* GALLERY */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Galerie (fichiers multiples)
                  </label>

                  <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100">

                    <Images className="h-4 w-4 shrink-0 text-gray-500" />

                    <span className="truncate">
                      {galleryFiles.length > 0
                        ? `${galleryFiles.length} fichier(s)`
                        : 'Images secondaires'}
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setGalleryFiles(
                          Array.from(
                            e.target.files || []
                          )
                        )
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    'Enregistrer le projet'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL MODIFICATION
      ===================================================== */}

      {isEditModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Modifier le projet
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editingProject.title}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseEditModal}
                disabled={isUpdating}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ERROR */}
            {editError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">

                <AlertCircle className="h-4 w-4 shrink-0" />

                <span>{editError}</span>
              </div>
            )}

            <form
              onSubmit={handleUpdateProject}
              className="space-y-4"
            >

              {/* TITRE */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Titre du projet{' '}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* RESUME */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Résumé court
                </label>

                <textarea
                  rows={2}
                  value={editSummary}
                  onChange={(e) =>
                    setEditSummary(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Technologies (séparées par des virgules)
                </label>

                <input
                  type="text"
                  placeholder="Ex: Next.js, Tailwind CSS, FastAPI, PostgreSQL"
                  value={editTechnologies}
                  onChange={(e) =>
                    setEditTechnologies(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* CHALLENGE / SOLUTION */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Défi / Problème
                  </label>

                  <textarea
                    rows={4}
                    value={editChallenge}
                    onChange={(e) =>
                      setEditChallenge(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Solution apportée
                  </label>

                  <textarea
                    rows={4}
                    value={editSolution}
                    onChange={(e) =>
                      setEditSolution(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>

              {/* IMAGES */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* COVER */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Nouvelle image de couverture
                  </label>

                  <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100">

                    <Upload className="h-4 w-4 shrink-0 text-gray-500" />

                    <span className="truncate">
                      {editCoverImageFile
                        ? editCoverImageFile.name
                        : 'Conserver l’image actuelle'}
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditCoverImageFile(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                      className="hidden"
                    />
                  </label>

                  {editingProject.cover_image && (
                    <p className="mt-1 text-[10px] text-gray-400">
                      Une nouvelle image remplacera
                      l’actuelle.
                    </p>
                  )}
                </div>

                {/* GALLERY */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Nouvelles images galerie
                  </label>

                  <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100">

                    <Images className="h-4 w-4 shrink-0 text-gray-500" />

                    <span className="truncate">
                      {editGalleryFiles.length > 0
                        ? `${editGalleryFiles.length} fichier(s)`
                        : 'Ajouter des images'}
                    </span>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setEditGalleryFiles(
                          Array.from(
                            e.target.files || []
                          )
                        )
                      }
                      className="hidden"
                    />
                  </label>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Les images sélectionnées seront
                    envoyées avec la modification.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">

                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  disabled={isUpdating}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Modification...
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Enregistrer les modifications
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL CONFIRMATION SUPPRESSION
      ===================================================== */}

      {isDeleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">

            {/* ICON */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>

            {/* CONTENT */}
            <div className="mt-4 text-center">

              <h2 className="text-lg font-bold text-gray-900">
                Confirmer la suppression
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Êtes-vous sûr de vouloir supprimer le
                projet{' '}
                <span className="font-semibold text-gray-900">
                  « {projectToDelete.title} »
                </span>
                ?
              </p>

              <p className="mt-2 text-xs text-red-500">
                Cette action est définitive et ne peut pas
                être annulée.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex items-center justify-end gap-3">

              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL ALERT / MESSAGE
      ===================================================== */}

      {alertType && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">

            {/* ICON */}
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                alertType === 'success'
                  ? 'bg-green-100'
                  : alertType === 'error'
                    ? 'bg-red-100'
                    : 'bg-yellow-100'
              }`}
            >
              {alertType === 'success' ? (
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              ) : alertType === 'error' ? (
                <AlertCircle className="h-7 w-7 text-red-600" />
              ) : (
                <AlertTriangle className="h-7 w-7 text-yellow-600" />
              )}
            </div>

            {/* CONTENT */}
            <div className="mt-4 text-center">

              <h2 className="text-lg font-bold text-gray-900">
                {alertTitle}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {alertMessage}
              </p>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-center">

              <button
                type="button"
                onClick={closeAlert}
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
                  alertType === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : alertType === 'error'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}