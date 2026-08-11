'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
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
  Images
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

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // --- États pour la Galerie (Visualisation) ---
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

  // --- États pour le Modal d'Ajout ---
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

  // Charger les portfolios au montage
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
      console.error("Erreur lors de la récupération:", err);
      const message = err.response?.data?.message || err.message || "Impossible de charger les données";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Reinitialiser le Formulaire
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
    setIsModalOpen(false);
    resetForm();
  };

  // Traitement sécurisé de la galerie (array, string JSON ou chaîne séparée par virgules)
  const parseGallery = (gallery?: string[] | string): string[] => {
    if (!gallery) return [];
    if (Array.isArray(gallery)) return gallery;
    if (typeof gallery === 'string') {
      try {
        const parsed = JSON.parse(gallery);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return gallery.split(',').map((img) => img.trim()).filter(Boolean);
      }
    }
    return [];
  };

  // Traitement sécurisé des technologies
  const parseTechnologies = (techs?: string[] | string): string[] => {
    if (!techs) return [];
    if (Array.isArray(techs)) return techs;
    if (typeof techs === 'string') return techs.split(',').map((t) => t.trim()).filter(Boolean);
    return [];
  };

  // Soumission du formulaire d'ajout
  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Le titre est obligatoire.");
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
      formData.append('user_id', "1");
      
      // Image de couverture principale
      if (coverImageFile) {
        formData.append('cover_image', coverImageFile);
      }

      // Images multiples pour la galerie
      if (galleryFiles.length > 0) {
        galleryFiles.forEach((file) => {
          formData.append('gallery', file); // Ou 'gallery[]' selon la configuration de Multer/FastAPI côté backend
        });
      }

      const response = await api.post('/portfolios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newProject = response.data.portfolio || response.data;
      if (newProject) {
        setProjects((prev) => [newProject, ...prev]);
      } else {
        await fetchPortfolios();
      }

      handleCloseModal();
    } catch (err: any) {
      console.error("Erreur création projet:", err);
      const message = err.response?.data?.message || err.message || "Erreur lors de la création du projet";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Suppression d'un portfolio
  const handleDelete = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/portfolios/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Une erreur est survenue lors de la suppression.";
      alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtrage local
  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = project.title?.toLowerCase().includes(term);
    const summaryMatch = project.summary?.toLowerCase().includes(term);
    return titleMatch || summaryMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Gestion du Portfolio
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos réalisations, projets clients et études de cas à présenter sur le site.
          </p>
        </div>

        {/* Barre d'outils */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par titre ou résumé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Swapper de vue */}
            <div className="flex items-center rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Vue liste"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Tableau</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Vue grille"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grille</span>
              </button>
            </div>

            {/* Bouton Ouvrir Modal d'Ajout */}
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shrink-0"
            >
              <Plus className="h-4 w-4" />
              Ajouter un projet
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-2" />
            <p className="text-sm text-gray-500">Chargement des réalisations...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-800 border border-red-200">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <div className="flex-1 text-sm">{error}</div>
            <button 
              onClick={fetchPortfolios}
              className="text-xs font-semibold underline hover:no-underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm">Aucun projet trouvé.</p>
          </div>
        )}

        {/* Vue Grille */}
        {!loading && !error && viewMode === 'grid' && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const techs = parseTechnologies(project.technologies);
              const galleryImages = parseGallery(project.gallery);

              return (
                <div 
                  key={project.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col justify-between transition hover:shadow-md"
                >
                  <div>
                    {/* Cover Image & Galerie Indicator */}
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

                      {/* Badge Galerie */}
                      {galleryImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedGallery(galleryImages)}
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow hover:bg-black/80 transition"
                        >
                          <Images className="h-3.5 w-3.5" />
                          <span>{galleryImages.length}</span>
                        </button>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {project.title}
                      </h3>
                      
                      {project.summary && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {project.summary}
                        </p>
                      )}

                      {/* Tech Stack */}
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {techs.map((tech, index) => (
                            <span 
                              key={`${project.id}-tech-${index}`} 
                              className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/50">
                    <span className="text-xs text-gray-400">
                      ID: #{project.id}
                    </span>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/portfolios/edit/${project.id}`}
                        className="rounded-lg p-1.5 text-blue-500 hover:bg-blue-50 transition"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                        title="Supprimer"
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Vue Tableau */}
        {!loading && !error && viewMode === 'table' && filteredProjects.length > 0 && (
          <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4">Titre</th>
                    <th scope="col" className="px-6 py-4">Résumé</th>
                    <th scope="col" className="px-6 py-4">Galerie</th>
                    <th scope="col" className="px-6 py-4">Technologies</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredProjects.map((project) => {
                    const techs = parseTechnologies(project.technologies);
                    const galleryImages = parseGallery(project.gallery);

                    return (
                      <tr key={project.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                          {project.summary || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {galleryImages.length > 0 ? (
                            <button
                              type="button"
                              onClick={() => setSelectedGallery(galleryImages)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:underline"
                            >
                              <Images className="h-3.5 w-3.5" />
                              {galleryImages.length} image(s)
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Aucune</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {techs.map((t, index) => (
                              <span key={`${project.id}-tbl-tech-${index}`} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/portfolios/edit/${project.id}`}
                              className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                              title="Modifier"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(project.id)}
                              disabled={deletingId === project.id}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                              title="Supprimer"
                            >
                              {deletingId === project.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* --- MODAL DE PRÉVISUALISATION DE LA GALERIE --- */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Images className="h-5 w-5 text-green-600" />
                Galerie de projet ({selectedGallery.length})
              </h3>
              <button
                onClick={() => setSelectedGallery(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {selectedGallery.map((imgUrl, idx) => (
                <div key={idx} className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                  <Image 
                    src={imgUrl} 
                    alt={`Image galerie ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL D'AJOUT DE PROJET --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl border border-gray-100 space-y-6">
            
            {/* En-tête Modal */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Nouveau Projet Portfolio</h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message d'Erreur dans le Modal */}
            {formError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleCreateProject} className="space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Titre du projet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Bosy - Plateforme de formation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* Résumé */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Résumé court</label>
                <textarea
                  rows={2}
                  placeholder="Brève description de la réalisation..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Next.js, Tailwind CSS, FastAPI, PostgreSQL"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Défi / Problème</label>
                  <textarea
                    rows={3}
                    placeholder="Quels problèmes devaient être résolus ?"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Solution apportée</label>
                  <textarea
                    rows={3}
                    placeholder="Comment le projet répond-il au besoin ?"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>

              {/* Image de couverture & Galerie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Image de Couverture */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Image de couverture</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 transition w-full">
                      <Upload className="h-4 w-4 text-gray-500 shrink-0" />
                      <span className="truncate">{coverImageFile ? coverImageFile.name : "Image principale"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Galerie d'Images Multiple */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Galerie (fichiers multiples)</label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 transition w-full">
                      <Images className="h-4 w-4 text-gray-500 shrink-0" />
                      <span className="truncate">
                        {galleryFiles.length > 0 ? `${galleryFiles.length} fichier(s)` : "Images secondaires"}
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions Modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    "Enregistrer le projet"
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}